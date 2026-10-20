import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { SafeImage } from "../ui/SafeImage";
import { TESTIMONIALS } from "../../data/testimonials";

const AUTOPLAY_DELAY = 6000;
const SWIPE_THRESHOLD = 50;

const slideVariants = {
  enter: (direction) => ({ x: direction > 0 ? 64 : -64, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction) => ({ x: direction > 0 ? -64 : 64, opacity: 0 }),
};

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);
  const reducedMotion = useReducedMotion();

  const goTo = useCallback(
    (nextIndex) => {
      const total = TESTIMONIALS.length;
      const normalized = ((nextIndex % total) + total) % total;
      setDirection(normalized > index || (index === total - 1 && normalized === 0) ? 1 : -1);
      setIndex(normalized);
    },
    [index]
  );

  const next = useCallback(() => {
    setDirection(1);
    setIndex((current) => (current + 1) % TESTIMONIALS.length);
  }, []);

  const previous = useCallback(() => {
    setDirection(-1);
    setIndex((current) => (current - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    if (paused) return undefined;
    const timer = setInterval(next, AUTOPLAY_DELAY);
    return () => clearInterval(timer);
  }, [paused, next]);

  function handleTouchStart(event) {
    touchStartX.current = event.touches[0].clientX;
  }

  function handleTouchEnd(event) {
    if (touchStartX.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      if (delta < 0) next();
      else previous();
    }
    touchStartX.current = null;
  }

  function handleKeyDown(event) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      next();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      previous();
    }
  }

  const testimonial = TESTIMONIALS[index];

  return (
    <section
      id="temoignages"
      className="relative scroll-mt-24 py-24 sm:py-32"
      aria-labelledby="temoignages-title"
    >
      <Container>
        <SectionHeading
          eyebrow="Témoignages"
          title="Ils ont repris le contrôle de leur temps."
          description="Des équipes ops, produit et finance qui ont fait de Nimbus leur bras droit opérationnel."
          align="center"
        />

        <div
          role="region"
          aria-roledescription="carrousel"
          aria-label="Témoignages clients"
          tabIndex={0}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onKeyDown={handleKeyDown}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="focus-ring relative mx-auto mt-2 max-w-3xl outline-none"
        >
          <div
            className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(ellipse_60%_80%_at_50%_30%,rgba(124,92,255,0.16),transparent_70%)]"
            aria-hidden="true"
          />

          <div className="relative min-h-[340px] sm:min-h-[300px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.figure
                key={testimonial.id}
                custom={direction}
                variants={reducedMotion ? undefined : slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                drag={reducedMotion ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.12}
                onDragEnd={(event, info) => {
                  if (info.offset.x < -SWIPE_THRESHOLD) next();
                  else if (info.offset.x > SWIPE_THRESHOLD) previous();
                }}
                className="surface absolute inset-0 flex flex-col justify-between p-7 sm:p-9"
                aria-live="polite"
              >
                <div>
                  <Quote className="h-7 w-7 text-primary/70" aria-hidden="true" />
                  <blockquote className="mt-4 text-balance text-lg font-medium leading-relaxed text-fg sm:text-xl">
                    « {testimonial.quote} »
                  </blockquote>
                </div>

                <figcaption className="mt-7 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <SafeImage
                      src={testimonial.avatar}
                      alt={`Portrait de ${testimonial.name}`}
                      className="h-11 w-11 rounded-full ring-1 ring-white/10"
                    />
                    <div>
                      <p className="text-sm font-semibold">{testimonial.name}</p>
                      <p className="text-xs text-muted">
                        {testimonial.role} · {testimonial.company}
                      </p>
                    </div>
                  </div>
                  <div
                    className="flex gap-0.5"
                    aria-label={`Note : ${testimonial.rating} sur 5`}
                  >
                    {Array.from({ length: 5 }, (_, starIndex) => (
                      <Star
                        key={starIndex}
                        className={`h-4 w-4 ${
                          starIndex < testimonial.rating
                            ? "fill-accent text-accent"
                            : "text-white/15"
                        }`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-7 flex items-center justify-between">
            <button
              type="button"
              onClick={previous}
              aria-label="Témoignage précédent"
              className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-fg transition-colors hover:bg-white/[0.09]"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="flex items-center gap-2" role="tablist" aria-label="Choisir un témoignage">
              {TESTIMONIALS.map((item, dotIndex) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={dotIndex === index}
                  aria-label={`Témoignage ${dotIndex + 1} sur ${TESTIMONIALS.length}`}
                  onClick={() => {
                    setDirection(dotIndex >= index ? 1 : -1);
                    goTo(dotIndex);
                  }}
                  className={`focus-ring h-2.5 rounded-full transition-all duration-300 ${
                    dotIndex === index
                      ? "w-7 bg-signature"
                      : "w-2.5 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              aria-label="Témoignage suivant"
              className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-fg transition-colors hover:bg-white/[0.09]"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
