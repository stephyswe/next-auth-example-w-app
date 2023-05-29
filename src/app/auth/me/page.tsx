import getCurrentUser from "../../../lib/getCurrentUser"
import getServerSessionAction from "../../../lib/getServerSession"

export default async function MePage() {
  const session = await getServerSessionAction()

  return (
    <>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </>
  )
}
