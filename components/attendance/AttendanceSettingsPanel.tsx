'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
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
  deleteAttendanceCampus,
  getAttendanceCampuses,
  getAttendanceGroups,
  getAttendanceStaff,
  removeAttendanceStaff,
  requestDeviceLocation,
  saveAttendanceCampus,
  saveAttendanceGroup,
  transferAttendanceStaff,
} from '@/lib/api/attendance'
import { getUsers, type User } from '@/lib/api/users'
import { getCampuses } from '@/lib/api/campuses'
import type { AttendanceCampus, StaffAssignment, StaffGroup, StaffGroupKind } from '@/lib/attendance/types'

type Tab = 'campuses' | 'groups' | 'staff'

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
  const [users, setUsers] = useState<User[]>([])

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

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [c, g, s, u] = await Promise.all([
        getAttendanceCampuses(true),
        getAttendanceGroups(true),
        getAttendanceStaff({ status: 'Active' }),
        getUsers().catch(() => [] as User[]),
      ])
      setCampuses(c)
      setGroups(g)
      setStaff(s)
      setUsers(
        u.filter((user) =>
          user.roles?.some((r) =>
            ['Teacher', 'Staff', 'ManagerialStaff', 'Admin'].includes(r)
          )
        )
      )
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unable to load settings.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const assignedIds = useMemo(() => new Set(staff.map((s) => s.userId)), [staff])
  const assignableUsers = users.filter((u) => !assignedIds.has(u.id))

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
      const user = users.find((u) => u.id === staffForm.userId)
      if (!user) throw new Error('Select a staff member.')
      await assignAttendanceStaff({
        userId: user.id,
        userName: `${user.firstName} ${user.lastName}`.trim(),
        userEmail: user.email,
        roles: user.roles,
        campusId: staffForm.campusId,
        groupId: staffForm.groupId,
      })
      setStaffForm({ userId: '', campusId: '', groupId: '' })
      setOk('Staff assigned to campus.')
      await refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Assign failed.')
    } finally {
      setSaving(false)
    }
  }

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'campuses', label: 'Campuses', icon: <Building2 className="h-4 w-4" /> },
    { id: 'groups', label: 'Groups & grace', icon: <Users className="h-4 w-4" /> },
    { id: 'staff', label: 'Staff roster', icon: <MapPin className="h-4 w-4" /> },
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
            Campuses, geofence radius, staff groups, grace time, and transfers.
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
                          {g.kind} · grace {g.graceMinutes}m · {g.shiftStart}–{g.shiftEnd}
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
                <h2 className="text-lg font-semibold text-gray-900">Assign staff</h2>
                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  <select
                    className="rounded-xl border border-gray-300 px-3 py-2.5"
                    value={staffForm.userId}
                    onChange={(e) => setStaffForm({ ...staffForm, userId: e.target.value })}
                  >
                    <option value="">Select staff / teacher</option>
                    {assignableUsers.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.firstName} {u.lastName} ({u.roles?.join(', ')})
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
                      </div>
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
        </>
      )}
    </div>
  )
}
