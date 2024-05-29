import CoverParticles from "@/components/cover-particles"
import TransitionsPage from "@/components/transitions-page";

export default function Home() {
  return (
    <main>

      <TransitionsPage/>
      <div className="flex min-h-[100vh] bg-gradient-cover">
        <CoverParticles>
          
        </CoverParticles>
        <p>Introduccion</p>
      </div>
    </main>
  );
}
