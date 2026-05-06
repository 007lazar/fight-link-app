export default function AboutPage() {
  return (
    <>

      <div className="w-full rounded-2xl overflow-hidden shadow-xl border border-base-300">
        <video
          autoPlay
          loop
          playsInline
          className="w-full h-auto"
        >
          <source src="/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </>
  )
}
