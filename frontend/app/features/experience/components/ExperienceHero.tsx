import CinematicVideoFrame from "~/components/ui/CinematicVideoFrame";
import Container from "~/components/ui/Container";

export function ExperienceHero() {
    return (
        <section className="relative w-full pt-16 pb-12 sm:pt-24 sm:pb-16 lg:pt-28 lg:pb-20 overflow-hidden ">

            <div
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[420px] w-[700px] rounded-full bg-[#a51d24]/20 blur-[130px] -z-1"
            />

            <Container className="relative z-10 text-center">


                <CinematicVideoFrame
                    src="https://www.youtube.com/embed/3Vrp3y8_XpI"
                    type="iframe"
                    aspectRatio="16/9"
                />

            </Container>
        </section>
    );
}