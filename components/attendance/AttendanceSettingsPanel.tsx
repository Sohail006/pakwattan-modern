'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  CalendarDays,
  Loader2,
  MapPin,
  Plus,
  Trash2,
  Users,
  Building2,
  Crosshair,
} from 'lucide-react'
import {
  assignAttendanceStaff,
  clearAttendanceBoundDevice,
  deleteAttendanceCalendarEntry,
  deleteAttendanceCampus,
  getAttendanceCalendar,
  getAttendanceCampuses,
  getAttendanceSettings,
  getAttendanceEligibleFaculty,
  getAttendanceGroups,
  getAttendanceStaff,
  removeAttendanceStaff,
  requestDeviceLocation,
  saveAttendanceCalendarEntry,
  saveAttendanceCampus,
  saveAttendanceGroup,
  transferAttendanceStaff,
  updateAttendanceSettings,
  type AttendanceEligibleFaculty,
} from '@/lib/api/attendance'
import { getCampuses } from '@/lib/api/campuses'
import type {
  AttendanceCalendarEntry,
  AttendanceCalendarKind,
  AttendanceCampus,
  StaffAssignment,
  StaffGroup,
  StaffGroupKind,
} from '@/lib/attendance/types'
import { formatTime } from '@/lib/utils'

type Tab = 'campuses' | 'groups' | 'staff' | 'calendar'

const WEEKDAY_OPTIONS: { value: number; label: string }[] = [
  { value: 0, label: 'Sunday' },
  { value: 1, label: 'Monday' },
  { value: 2, label: 'Tuesday' },
  { value: 3, label: 'Wednesday' },
  { value: 4, label: 'Thursday' },
  { value: 5, label: 'Friday' },
  { value: 6, label: 'Saturday' },
]

const GROUP_KINDS: StaffGroupKind[] = [
  'Teaching',
  'Clerical',
  'Managerial',
  'Support',
  'Other',
]

export default function AttendanceSettingsPanel() {
  const [tab, setTab] = useState<Tab>('campuses')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [ok, setOk] = useState<string | null>(null)
  const [campuses, setCampuses] = useState<AttendanceCampus[]>([])
  const [groups, setGroups] = useState<StaffGroup[]>([])
  const [staff, setStaff] = useState<StaffAssignment[]>([])
  const [eligibleFaculty, setEligibleFaculty] = useState<AttendanceEligibleFaculty[]>([])

  const [campusForm, setCampusForm] = useState({
    id: '',
    name: '',
    address: '',
    latitude: '',
    longitude: '',
    radiusMeters: '120',
  })
  const [groupForm, setGroupForm] = useState({
    id: '',
    name: '',
    kind: 'Teaching' as StaffGroupKind,
    graceMinutes: '15',
    shiftStart: '08:00',
    shiftEnd: '14:30',
  })
  const [staffForm, setStaffForm] = useState({
    userId: '',
    campusId: '',
    groupId: '',
  })
  const [transfer, setTransfer] = useState({
    assignmentId: '',
    campusId: '',
    groupId: '',
  })
  const [weeklyOffDays, setWeeklyOffDays] = useState<number[]>([0, 6])
  const [calendarYear, setCalendarYear] = useState(() => new Date().getFullYear())
  const [calendarEntries, setCalendarEntries] = useState<AttendanceCalendarEntry[]>([])
  const [calendarForm, setCalendarForm] = useState({
    id: '',
    kind: 'Holiday' as AttendanceCalendarKind,
    title: '',
    startDate: '',
    endDate: '',
  })

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      // Core attendance data first (fast). User directory loads only for staff tab.
      const [c, g, s] = await Promise.all([
        getAttendanceCampuses(true),
        getAttendanceGroups(true),
        getAttendanceStaff({ status: 'Active' }),
      ])
      setCampuses(c)
      setGroups(g)
      setStaff(s)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unable to load settings.')
    } finally {
      setLoading(false)
    }
  }, [])

  const refreshCalendar = useCallback(async () => {
    try {
      const data = await getAttendanceCalendar(calendarYear)
      setWeeklyOffDays(data.weeklyOffDays?.length ? data.weeklyOffDays : [0, 6])
      setCalendarEntries(data.entries || [])
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unable to load academic calendar.')
    }
  }, [calendarYear])

  useEffect(() => {
    refresh()
  }, [refresh])

  useEffect(() => {
    if (tab !== 'calendar') return
    refreshCalendar()
  }, [tab, refreshCalendar])

  useEffect(() => {
    if (tab !== 'staff') return
    let cancelled = false
    getAttendanceEligibleFaculty()
      .then((list) => {
        if (!cancelled) setEligibleFaculty(list)
      })
      .catch(() => {
        if (!cancelled) setEligibleFaculty([])
      })
    return () => {
      cancelled = true
    }
  }, [tab, staff])

  const assignableFaculty = eligibleFaculty

  const fillMyLocation = async () => {
    try {
      const pos = await requestDeviceLocation()
      setCampusForm((f) => ({
        ...f,
        latitude: String(pos.coords.latitude.toFixed(6)),
        longitude: String(pos.coords.longitude.toFixed(6)),
      }))
      setOk('Coordinates filled from your current location.')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not read location.')
    }
  }

  const importSchoolCampuses = async () => {
    setSaving(true)
    setError(null)
    setOk(null)
    try {
      const list = await getCampuses(true)
      let updated = 0
      for (const c of list) {
        if (!c.name) continue
        // Sync existing school campus into attendance geofence fields (same SQL Campus row)
        const hasGeo =
          typeof c.latitude === 'number' &&
          typeof c.longitude === 'number' &&
          Number.isFinite(c.latitude) &&
          Number.isFinite(c.longitude)
        await saveAttendanceCampus({
          id: String(c.id),
          name: c.name,
          address: c.address,
          externalCampusId: c.id,
          latitude: hasGeo ? (c.latitude as number) : 34.05258,
          longitude: hasGeo ? (c.longitude as number) : 73.15232,
          radiusMeters: c.radiusMeters || 120,
          isActive: c.isActive !== false,
        })
        updated += 1
      }
      setOk(
        updated
          ? `Synced ${updated} campus(es) from school database. Stand at each campus and use “Use my current location”, then Save.`
          : 'No campuses found in school database.'
      )
      await refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not import campuses.')
    } finally {
      setSaving(false)
    }
  }

  const saveCampus = async () => {
    setSaving(true)
    setError(null)
    setOk(null)
    try {
      await saveAttendanceCampus({
        id: campusForm.id || undefined,
        name: campusForm.name,
        address: campusForm.address || undefined,
        latitude: parseFloat(campusForm.latitude),
        longitude: parseFloat(campusForm.longitude),
        radiusMeters: parseInt(campusForm.radiusMeters, 10),
        isActive: true,
      })
      setCampusForm({
        id: '',
        name: '',
        address: '',
        latitude: '',
        longitude: '',
        radiusMeters: '120',
      })
      setOk('Campus saved.')
      await refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Save failed.')
    } finally {
      setSaving(false)
    }
  }

  const saveGroup = async () => {
    setSaving(true)
    setError(null)
    setOk(null)
    try {
      await saveAttendanceGroup({
        id: groupForm.id || undefined,
        name: groupForm.name,
        kind: groupForm.kind,
        graceMinutes: parseInt(groupForm.graceMinutes, 10),
        shiftStart: groupForm.shiftStart,
        shiftEnd: groupForm.shiftEnd,
        requireCheckout: true,
        isActive: true,
      })
      setGroupForm({
        id: '',
        name: '',
        kind: 'Teaching',
        graceMinutes: '15',
        shiftStart: '08:00',
        shiftEnd: '14:30',
      })
      setOk('Staff group saved.')
      await refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Save failed.')
    } finally {
      setSaving(false)
    }
  }

  const addStaff = async () => {
    setSaving(true)
    setError(null)
    setOk(null)
    try {
      const member = eligibleFaculty.find((f) => f.userId === staffForm.userId)
      if (!member) throw new Error('Select a verified Pakians Faculty member.')
      await assignAttendanceStaff({
        userId: member.userId,
        userName: member.name,
        userEmail: member.email,
        roles: member.assignedRole ? [member.assignedRole] : undefined,
        campusId: staffForm.campusId,
        groupId: staffForm.groupId,
      })
      setStaffForm({ userId: '', campusId: '', groupId: '' })
      setOk('Faculty assigned to campus attendance.')
      await refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Assign failed.')
    } finally {
      setSaving(false)
    }
  }

  const saveWeeklyOffs = async () => {
    setSaving(true)
    setError(null)
    setOk(null)
    try {
      const current = await getAttendanceSettings()
      await updateAttendanceSettings({
        ...current.settings,
        weeklyOffDays,
      })
      setOk('Weekly off days saved. Staff will not see check-in on those days.')
      await refreshCalendar()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not save weekly off days.')
    } finally {
      setSaving(false)
    }
  }

  const saveCalendarItem = async () => {
    if (!calendarForm.title.trim() || !calendarForm.startDate) {
      setError('Title and start date are required.')
      return
    }
    setSaving(true)
    setError(null)
    setOk(null)
    try {
      await saveAttendanceCalendarEntry({
        id: calendarForm.id || undefined,
        kind: calendarForm.kind,
        title: calendarForm.title.trim(),
        startDate: calendarForm.startDate,
        endDate:
          calendarForm.kind === 'Vacation'
            ? calendarForm.endDate || calendarForm.startDate
            : calendarForm.startDate,
        isActive: true,
      })
      setCalendarForm({ id: '', kind: 'Holiday', title: '', startDate: '', endDate: '' })
      setOk(
        calendarForm.kind === 'Holiday'
          ? 'Public holiday saved.'
          : 'Vacation period saved.'
      )
      await refreshCalendar()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not save calendar entry.')
    } finally {
      setSaving(false)
    }
  }

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'campuses', label: 'Campuses', icon: <Building2 className="h-4 w-4" /> },
    { id: 'groups', label: 'Groups & grace', icon: <Users className="h-4 w-4" /> },
    { id: 'staff', label: 'Staff roster', icon: <MapPin className="h-4 w-4" /> },
    { id: 'calendar', label: 'Academic calendar', icon: <CalendarDays className="h-4 w-4" /> },
  ]

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/dashboard/attendance"
            className="mb-2 inline-flex items-center gap-1 text-sm font-semibold text-emerald-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to board
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Attendance settings</h1>
          <p className="mt-1 text-sm text-gray-600">
            Campuses, staff groups, roster, and academic calendar (off days, holidays, vacations).
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`inline-flex min-h-[44px] items-center gap-2 rounded-xl px-4 text-sm font-semibold ${
              tab === t.id
                ? 'bg-emerald-700 text-white'
                : 'border border-gray-200 bg-white text-gray-700'
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {error && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
          {error}
        </div>
      )}
      {ok && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          {ok}
        </div>
      )}

      {loading ? (
        <div className="rounded-2xl border bg-white p-10 text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-emerald-700" />
        </div>
      ) : (
        <>
          {tab === 'campuses' && (
            <div className="grid gap-5 lg:grid-cols-2">
              <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
                <h2 className="text-lg font-semibold text-gray-900">
                  {campusForm.id ? 'Edit campus' : 'Add campus'}
                </h2>
                <div className="mt-4 space-y-3">
                  <input
                    className="w-full rounded-xl border border-gray-300 px-3 py-2.5"
                    placeholder="Campus name"
                    value={campusForm.name}
                    onChange={(e) => setCampusForm({ ...campusForm, name: e.target.value })}
                  />
                  <input
                    className="w-full rounded-xl border border-gray-300 px-3 py-2.5"
                    placeholder="Address (optional)"
                    value={campusForm.address}
                    onChange={(e) => setCampusForm({ ...campusForm, address: e.target.value })}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      className="rounded-xl border border-gray-300 px-3 py-2.5"
                      placeholder="Latitude"
                      value={campusForm.latitude}
                      onChange={(e) =>
                        setCampusForm({ ...campusForm, latitude: e.target.value })
                      }
                    />
                    <input
                      className="rounded-xl border border-gray-300 px-3 py-2.5"
                      placeholder="Longitude"
                      value={campusForm.longitude}
                      onChange={(e) =>
                        setCampusForm({ ...campusForm, longitude: e.target.value })
                      }
                    />
                  </div>
                  <input
                    className="w-full rounded-xl border border-gray-300 px-3 py-2.5"
                    placeholder="Radius meters (e.g. 120)"
                    value={campusForm.radiusMeters}
                    onChange={(e) =>
                      setCampusForm({ ...campusForm, radiusMeters: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    onClick={fillMyLocation}
                    className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 text-sm font-semibold text-emerald-900"
                  >
                    <Crosshair className="h-4 w-4" />
                    Use my current location
                  </button>
                  <button
                    type="button"
                    disabled={saving}
                    onClick={importSchoolCampuses}
                    className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-800 disabled:opacity-60"
                  >
                    Import names from school campuses
                  </button>
                  <button
                    type="button"
                    disabled={saving}
                    onClick={saveCampus}
                    className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 text-sm font-bold text-white disabled:opacity-60"
                  >
                    {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                    Save campus
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {campuses.map((c) => (
                  <div
                    key={c.id}
                    className={`rounded-2xl border p-4 shadow-sm ${
                      c.isActive ? 'border-gray-200 bg-white' : 'border-gray-100 bg-gray-50 opacity-70'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-gray-900">{c.name}</p>
                        <p className="text-xs text-gray-500">{c.address || 'No address'}</p>
                        <p className="mt-1 text-xs text-emerald-800">
                          {c.latitude.toFixed(5)}, {c.longitude.toFixed(5)} · {c.radiusMeters}m
                          radius
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <button
                          type="button"
                          className="rounded-lg border px-2 py-1 text-xs font-semibold"
                          onClick={() =>
                            setCampusForm({
                              id: c.id,
                              name: c.name,
                              address: c.address || '',
                              latitude: String(c.latitude),
                              longitude: String(c.longitude),
                              radiusMeters: String(c.radiusMeters),
                            })
                          }
                        >
                          Edit
                        </button>
                        {c.isActive && (
                          <button
                            type="button"
                            className="rounded-lg border border-rose-200 px-2 py-1 text-xs font-semibold text-rose-700"
                            onClick={async () => {
                              try {
                                await deleteAttendanceCampus(c.id)
                                await refresh()
                              } catch (e) {
                                setError(e instanceof Error ? e.message : 'Delete failed')
                              }
                            }}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {campuses.length === 0 && (
                  <p className="rounded-2xl border border-dashed p-8 text-center text-sm text-gray-500">
                    Add your first campus with GPS coordinates.
                  </p>
                )}
              </div>
            </div>
          )}

          {tab === 'groups' && (
            <div className="grid gap-5 lg:grid-cols-2">
              <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
                <h2 className="text-lg font-semibold text-gray-900">
                  {groupForm.id ? 'Edit group' : 'Add staff group'}
                </h2>
                <div className="mt-4 space-y-3">
                  <input
                    className="w-full rounded-xl border border-gray-300 px-3 py-2.5"
                    placeholder="Group name"
                    value={groupForm.name}
                    onChange={(e) => setGroupForm({ ...groupForm, name: e.target.value })}
                  />
                  <select
                    className="w-full rounded-xl border border-gray-300 px-3 py-2.5"
                    value={groupForm.kind}
                    onChange={(e) =>
                      setGroupForm({ ...groupForm, kind: e.target.value as StaffGroupKind })
                    }
                  >
                    {GROUP_KINDS.map((k) => (
                      <option key={k} value={k}>
                        {k}
                      </option>
                    ))}
                  </select>
                  <input
                    className="w-full rounded-xl border border-gray-300 px-3 py-2.5"
                    placeholder="Grace minutes"
                    value={groupForm.graceMinutes}
                    onChange={(e) =>
                      setGroupForm({ ...groupForm, graceMinutes: e.target.value })
                    }
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <label className="text-xs font-semibold text-gray-600">
                      Shift start
                      <input
                        type="time"
                        className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm"
                        value={groupForm.shiftStart}
                        onChange={(e) =>
                          setGroupForm({ ...groupForm, shiftStart: e.target.value })
                        }
                      />
                    </label>
                    <label className="text-xs font-semibold text-gray-600">
                      Shift end
                      <input
                        type="time"
                        className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm"
                        value={groupForm.shiftEnd}
                        onChange={(e) =>
                          setGroupForm({ ...groupForm, shiftEnd: e.target.value })
                        }
                      />
                    </label>
                  </div>
                  <button
                    type="button"
                    disabled={saving}
                    onClick={saveGroup}
                    className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 text-sm font-bold text-white disabled:opacity-60"
                  >
                    Save group
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {groups.map((g) => (
                  <div key={g.id} className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-gray-900">{g.name}</p>
                        <p className="text-xs text-gray-500">
                          {g.kind} · grace {g.graceMinutes}m ·{' '}
                          {formatTime(g.shiftStart)}–{formatTime(g.shiftEnd)}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="rounded-lg border px-2 py-1 text-xs font-semibold"
                        onClick={() =>
                          setGroupForm({
                            id: g.id,
                            name: g.name,
                            kind: g.kind,
                            graceMinutes: String(g.graceMinutes),
                            shiftStart: g.shiftStart,
                            shiftEnd: g.shiftEnd,
                          })
                        }
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'staff' && (
            <div className="space-y-5">
              <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
                <h2 className="text-lg font-semibold text-gray-900">Assign faculty</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Only verified Pakians Faculty Registration members can be added to attendance.
                </p>
                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  <select
                    className="rounded-xl border border-gray-300 px-3 py-2.5"
                    value={staffForm.userId}
                    onChange={(e) => setStaffForm({ ...staffForm, userId: e.target.value })}
                  >
                    <option value="">Select verified faculty</option>
                    {assignableFaculty.map((f) => (
                      <option key={f.userId} value={f.userId}>
                        {f.name}
                        {f.assignedRole ? ` (${f.assignedRole})` : ''}
                        {f.username ? ` · @${f.username}` : ''}
                      </option>
                    ))}
                  </select>
                  <select
                    className="rounded-xl border border-gray-300 px-3 py-2.5"
                    value={staffForm.campusId}
                    onChange={(e) => setStaffForm({ ...staffForm, campusId: e.target.value })}
                  >
                    <option value="">Campus</option>
                    {campuses.filter((c) => c.isActive).map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  <select
                    className="rounded-xl border border-gray-300 px-3 py-2.5"
                    value={staffForm.groupId}
                    onChange={(e) => setStaffForm({ ...staffForm, groupId: e.target.value })}
                  >
                    <option value="">Staff group</option>
                    {groups.filter((g) => g.isActive).map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="button"
                  disabled={saving}
                  onClick={addStaff}
                  className="mt-3 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 text-sm font-bold text-white disabled:opacity-60"
                >
                  Assign to campus
                </button>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
                <h2 className="text-lg font-semibold text-gray-900">Transfer staff</h2>
                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  <select
                    className="rounded-xl border border-gray-300 px-3 py-2.5"
                    value={transfer.assignmentId}
                    onChange={(e) => setTransfer({ ...transfer, assignmentId: e.target.value })}
                  >
                    <option value="">Select assigned staff</option>
                    {staff.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.userName}
                      </option>
                    ))}
                  </select>
                  <select
                    className="rounded-xl border border-gray-300 px-3 py-2.5"
                    value={transfer.campusId}
                    onChange={(e) => setTransfer({ ...transfer, campusId: e.target.value })}
                  >
                    <option value="">New campus</option>
                    {campuses.filter((c) => c.isActive).map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  <select
                    className="rounded-xl border border-gray-300 px-3 py-2.5"
                    value={transfer.groupId}
                    onChange={(e) => setTransfer({ ...transfer, groupId: e.target.value })}
                  >
                    <option value="">Keep / change group</option>
                    {groups.filter((g) => g.isActive).map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="button"
                  disabled={saving}
                  onClick={async () => {
                    setSaving(true)
                    setError(null)
                    try {
                      await transferAttendanceStaff(transfer.assignmentId, {
                        campusId: transfer.campusId,
                        groupId: transfer.groupId || undefined,
                      })
                      setTransfer({ assignmentId: '', campusId: '', groupId: '' })
                      setOk('Staff transferred.')
                      await refresh()
                    } catch (e) {
                      setError(e instanceof Error ? e.message : 'Transfer failed')
                    } finally {
                      setSaving(false)
                    }
                  }}
                  className="mt-3 inline-flex min-h-[48px] items-center justify-center rounded-xl bg-teal-700 px-5 text-sm font-bold text-white disabled:opacity-60"
                >
                  Transfer
                </button>
              </div>

              <div className="space-y-3">
                {staff.map((s) => {
                  const campus = campuses.find((c) => c.id === s.campusId)
                  const group = groups.find((g) => g.id === s.groupId)
                  return (
                    <div
                      key={s.id}
                      className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <p className="font-semibold text-gray-900">{s.userName}</p>
                        <p className="text-xs text-gray-500">
                          {campus?.name} · {group?.name} · {s.roles?.join(', ')}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          Device:{' '}
                          {s.deviceBound ? (
                            <span className="font-medium text-emerald-700">
                              Bound{s.boundDeviceId ? ` (${s.boundDeviceId})` : ''}
                            </span>
                          ) : (
                            <span className="font-medium text-amber-700">Not bound (auto on first check-in)</span>
                          )}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {s.deviceBound && (
                          <button
                            type="button"
                            className="inline-flex min-h-[44px] items-center justify-center gap-1 rounded-xl border border-amber-200 px-3 text-sm font-semibold text-amber-800"
                            onClick={async () => {
                              if (
                                !confirm(
                                  `Clear bound device for ${s.userName}? Their next check-in will auto-bind a new device.`
                                )
                              ) {
                                return
                              }
                              try {
                                await clearAttendanceBoundDevice(s.id)
                                setOk(`Device binding cleared for ${s.userName}.`)
                                await refresh()
                              } catch (e) {
                                setError(e instanceof Error ? e.message : 'Clear device failed')
                              }
                            }}
                          >
                            Clear device
                          </button>
                        )}
                        <button
                          type="button"
                          className="inline-flex min-h-[44px] items-center justify-center gap-1 rounded-xl border border-rose-200 px-3 text-sm font-semibold text-rose-700"
                          onClick={async () => {
                            if (!confirm(`Remove ${s.userName} from attendance roster?`)) return
                            try {
                              await removeAttendanceStaff(s.id)
                              await refresh()
                            } catch (e) {
                              setError(e instanceof Error ? e.message : 'Remove failed')
                            }
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                          Remove
                        </button>
                      </div>
                    </div>
                  )
                })}
                {staff.length === 0 && (
                  <p className="rounded-2xl border border-dashed p-8 text-center text-sm text-gray-500">
                    No staff assigned yet.
                  </p>
                )}
              </div>
            </div>
          )}

          {tab === 'calendar' && (
            <div className="space-y-5">
              <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
                <h2 className="text-lg font-bold text-gray-900">Weekly off days</h2>
                <p className="mt-1 text-sm text-gray-600">
                  Staff will not see check-in / check-out on these weekdays.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {WEEKDAY_OPTIONS.map((d) => {
                    const on = weeklyOffDays.includes(d.value)
                    return (
                      <button
                        key={d.value}
                        type="button"
                        onClick={() =>
                          setWeeklyOffDays((prev) =>
                            on
                              ? prev.filter((x) => x !== d.value)
                              : [...prev, d.value].sort((a, b) => a - b)
                          )
                        }
                        className={`min-h-[44px] rounded-xl border px-3 text-sm font-semibold ${
                          on
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                            : 'border-gray-200 bg-white text-gray-700'
                        }`}
                      >
                        {d.label}
                      </button>
                    )
                  })}
                </div>
                <button
                  type="button"
                  disabled={saving}
                  onClick={saveWeeklyOffs}
                  className="mt-4 inline-flex min-h-[44px] items-center rounded-xl bg-emerald-700 px-4 text-sm font-semibold text-white disabled:opacity-50"
                >
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  Save weekly offs
                </button>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Holidays &amp; vacations</h2>
                    <p className="mt-1 text-sm text-gray-600">
                      Public holidays (one day) and vacation periods (date range).
                    </p>
                  </div>
                  <label className="text-sm font-semibold text-gray-700">
                    Year
                    <select
                      className="ml-2 rounded-lg border border-gray-200 px-3 py-2"
                      value={calendarYear}
                      onChange={(e) => setCalendarYear(Number(e.target.value))}
                    >
                      {[calendarYear - 1, calendarYear, calendarYear + 1].map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <label className="text-sm font-semibold text-gray-700">
                    Type
                    <select
                      className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-base"
                      value={calendarForm.kind}
                      onChange={(e) =>
                        setCalendarForm((f) => ({
                          ...f,
                          kind: e.target.value as AttendanceCalendarKind,
                        }))
                      }
                    >
                      <option value="Holiday">Public holiday</option>
                      <option value="Vacation">Vacation period</option>
                    </select>
                  </label>
                  <label className="text-sm font-semibold text-gray-700 sm:col-span-2 lg:col-span-1">
                    Title
                    <input
                      className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-base"
                      value={calendarForm.title}
                      onChange={(e) =>
                        setCalendarForm((f) => ({ ...f, title: e.target.value }))
                      }
                      placeholder="e.g. Eid holiday"
                    />
                  </label>
                  <label className="text-sm font-semibold text-gray-700">
                    Start date
                    <input
                      type="date"
                      className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-base"
                      value={calendarForm.startDate}
                      onChange={(e) =>
                        setCalendarForm((f) => ({ ...f, startDate: e.target.value }))
                      }
                    />
                  </label>
                  {calendarForm.kind === 'Vacation' && (
                    <label className="text-sm font-semibold text-gray-700">
                      End date
                      <input
                        type="date"
                        className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-base"
                        value={calendarForm.endDate}
                        onChange={(e) =>
                          setCalendarForm((f) => ({ ...f, endDate: e.target.value }))
                        }
                      />
                    </label>
                  )}
                </div>
                <button
                  type="button"
                  disabled={saving}
                  onClick={saveCalendarItem}
                  className="mt-4 inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-emerald-700 px-4 text-sm font-semibold text-white disabled:opacity-50"
                >
                  <Plus className="h-4 w-4" />
                  {calendarForm.id ? 'Update entry' : 'Add entry'}
                </button>

                <div className="mt-5 space-y-2">
                  {calendarEntries.map((e) => (
                    <div
                      key={e.id}
                      className="flex flex-col gap-2 rounded-xl border border-gray-100 bg-gray-50/80 px-3 py-3 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-900">
                          {e.title}{' '}
                          <span className="text-xs font-medium text-gray-500">({e.kind})</span>
                        </p>
                        <p className="text-xs text-gray-600">
                          {e.startDate}
                          {e.endDate !== e.startDate ? ` → ${e.endDate}` : ''}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          className="min-h-[40px] rounded-lg border border-gray-200 bg-white px-3 text-xs font-semibold text-gray-700"
                          onClick={() =>
                            setCalendarForm({
                              id: e.id,
                              kind: e.kind,
                              title: e.title,
                              startDate: e.startDate,
                              endDate: e.endDate,
                            })
                          }
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="inline-flex min-h-[40px] items-center gap-1 rounded-lg border border-rose-200 bg-rose-50 px-3 text-xs font-semibold text-rose-700"
                          onClick={async () => {
                            if (!confirm(`Delete “${e.title}”?`)) return
                            try {
                              await deleteAttendanceCalendarEntry(e.id)
                              setOk('Calendar entry deleted.')
                              await refreshCalendar()
                            } catch (err) {
                              setError(
                                err instanceof Error ? err.message : 'Delete failed.'
                              )
                            }
                          }}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                  {calendarEntries.length === 0 && (
                    <p className="rounded-xl border border-dashed p-6 text-center text-sm text-gray-500">
                      No holidays or vacations for {calendarYear} yet.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
