export default function BgOrbs() {
  const isMobile = window.innerWidth <= 768
  if (isMobile) return null
  return (
    <>
      <div className="bg-grid" aria-hidden="true" />
      <div className="bg-blob1" aria-hidden="true" />
      <div className="bg-blob2" aria-hidden="true" />
    </>
  )
}