import { promises as fs } from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'
import type {
  AttendanceCampus,
  AttendanceDb,
  AttendanceRecord,
  AttendanceSettings,
  StaffAssignment,
  StaffGroup,
} from './types'

const DATA_DIR = path.join(process.cwd(), 'data', 'attendance')
const DB_FILE = path.join(DATA_DIR, 'db.json')

function defaultSettings(): AttendanceSettings {
  return {
    timezone: 'Asia/Karachi',
    allowCheckInWithoutGps: false,
    pendingNeedsAdmin: true,
    reminderCheckoutMinutes: 30,
    updatedAt: new Date().toISOString(),
  }
}

function seedGroups(): StaffGroup[] {
  const now = new Date().toISOString()
  return [
    {
      id: randomUUID(),
      name: 'Teaching Staff',
      kind: 'Teaching',
      graceMinutes: 15,
      shiftStart: '08:00',
      shiftEnd: '14:30',
      requireCheckout: true,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: randomUUID(),
      name: 'Clerical Staff',
      kind: 'Clerical',
      graceMinutes: 10,
      shiftStart: '08:30',
      shiftEnd: '15:00',
      requireCheckout: true,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: randomUUID(),
      name: 'Managerial Staff',
      kind: 'Managerial',
      graceMinutes: 20,
      shiftStart: '09:00',
      shiftEnd: '16:00',
      requireCheckout: true,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    },
  ]
}

function emptyDb(): AttendanceDb {
  return {
    settings: defaultSettings(),
    campuses: [],
    groups: seedGroups(),
    assignments: [],
    records: [],
  }
}

let writeChain: Promise<unknown> = Promise.resolve()

async function ensureDb(): Promise<AttendanceDb> {
  await fs.mkdir(DATA_DIR, { recursive: true })
  try {
    const raw = await fs.readFile(DB_FILE, 'utf8')
    const parsed = JSON.parse(raw) as AttendanceDb
    return {
      settings: { ...defaultSettings(), ...parsed.settings },
      campuses: Array.isArray(parsed.campuses) ? parsed.campuses : [],
      groups: Array.isArray(parsed.groups) && parsed.groups.length ? parsed.groups : seedGroups(),
      assignments: Array.isArray(parsed.assignments) ? parsed.assignments : [],
      records: Array.isArray(parsed.records) ? parsed.records : [],
    }
  } catch {
    const db = emptyDb()
    await fs.writeFile(DB_FILE, JSON.stringify(db, null, 2), 'utf8')
    return db
  }
}

async function persist(db: AttendanceDb): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true })
  await fs.writeFile(DB_FILE, JSON.stringify(db, null, 2), 'utf8')
}

/** Serialized read-modify-write to avoid races on the JSON file */
export async function withDb<T>(fn: (db: AttendanceDb) => T | Promise<T>): Promise<T> {
  const run = writeChain.then(async () => {
    const db = await ensureDb()
    const result = await fn(db)
    await persist(db)
    return result
  })
  writeChain = run.then(
    () => undefined,
    () => undefined
  )
  return run
}

export async function readDb(): Promise<AttendanceDb> {
  return withDb((db) => structuredClone(db))
}

export function newId(): string {
  return randomUUID()
}

export type {
  AttendanceCampus,
  AttendanceRecord,
  AttendanceSettings,
  StaffAssignment,
  StaffGroup,
}
