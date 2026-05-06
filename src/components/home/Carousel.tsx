import Image from 'next/image';

const Carousel = () => {
  return (
    <div className="flex w-full overflow-x-auto snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden rounded-xl">
      <div id="slide1" className="snap-center shrink-0 relative w-full aspect-[21/9]">
        <Image
          src="https://preview.redd.it/upcoming-events-v0-fkt12xrjnffg1.png?auto=webp&s=cc2bd52bfbcd063bd9f77176ab1f203c305ab3ed"
          fill
          sizes="100vw"
          loading="eager"
          className="object-cover"
          alt="Event slide 1"
          priority
        />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between">
          <a
            href="#slide2"
            className="inline-flex size-10 items-center justify-center rounded-full bg-background/80 text-foreground transition-colors hover:bg-background"
          >
            ❮
          </a>
          <a
            href="#slide2"
            className="inline-flex size-10 items-center justify-center rounded-full bg-background/80 text-foreground transition-colors hover:bg-background"
          >
            ❯
          </a>
        </div>
      </div>

      <div id="slide2" className="snap-center shrink-0 relative w-full aspect-[21/9]">
        <Image
          src="https://preview.redd.it/upcoming-events-v0-fkt12xrjnffg1.png?auto=webp&s=cc2bd52bfbcd063bd9f77176ab1f203c305ab3ed"
          fill
          sizes="100vw"
          loading="eager"
          className="object-cover"
          alt="Event slide 2"
        />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between">
          <a
            href="#slide1"
            className="inline-flex size-10 items-center justify-center rounded-full bg-background/80 text-foreground transition-colors hover:bg-background"
          >
            ❮
          </a>
          <a
            href="#slide1"
            className="inline-flex size-10 items-center justify-center rounded-full bg-background/80 text-foreground transition-colors hover:bg-background"
          >
            ❯
          </a>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
