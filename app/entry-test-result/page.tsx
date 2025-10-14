import EntryTestResultHero from '@/components/entry-test-result/EntryTestResultHero'
import EntryTestResultDetails from '@/components/entry-test-result/EntryTestResultDetails'
import EntryTestResultSearch from '@/components/entry-test-result/EntryTestResultSearch'

export default function EntryTestResult() {
  return (
    <div className="min-h-screen">
      <EntryTestResultHero />
      <EntryTestResultDetails />
      <EntryTestResultSearch />
    </div>
  )
}
