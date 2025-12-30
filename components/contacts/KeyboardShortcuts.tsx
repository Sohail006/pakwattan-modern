'use client'

import { useEffect } from 'react'
import { toastService } from '@/lib/utils/toast'

interface KeyboardShortcutsProps {
	onAdd?: () => void
	onRefresh?: () => void
	onSearchFocus?: () => void
	onClearFilters?: () => void
	enabled?: boolean
}

export default function KeyboardShortcuts({
	onAdd,
	onRefresh,
	onSearchFocus,
	onClearFilters,
	enabled = true
}: KeyboardShortcutsProps) {
	useEffect(() => {
		if (!enabled) return

		const handleKeyDown = (e: KeyboardEvent) => {
			// Ignore if typing in input, textarea, or contenteditable
			const target = e.target as HTMLElement
			if (
				target.tagName === 'INPUT' ||
				target.tagName === 'TEXTAREA' ||
				target.isContentEditable ||
				(target.tagName === 'SELECT')
			) {
				return
			}

			// Ctrl/Cmd + N: Add new contact
			if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
				e.preventDefault()
				if (onAdd) {
					onAdd()
					toastService.info('Add new contact (Ctrl+N)')
				}
				return
			}

			// Ctrl/Cmd + R: Refresh
			if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
				e.preventDefault()
				if (onRefresh) {
					onRefresh()
					toastService.info('Refreshed contacts')
				}
				return
			}

			// Ctrl/Cmd + K or /: Focus search
			if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
				e.preventDefault()
				if (onSearchFocus) {
					onSearchFocus()
				}
				return
			}

			if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
				e.preventDefault()
				if (onSearchFocus) {
					onSearchFocus()
				}
				return
			}

			// Escape: Clear filters
			if (e.key === 'Escape') {
				if (onClearFilters) {
					onClearFilters()
					toastService.info('Filters cleared')
				}
				return
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => {
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [enabled, onAdd, onRefresh, onSearchFocus, onClearFilters])

	return null
}
