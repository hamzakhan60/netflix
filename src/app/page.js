"use client"
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleVideoEnd = () => {
    router.push('/signup');
  };

  return (
    <>
      <video
        className="video-iframe -mt-24 w-full h-screen-150"
        src="https://utjxbnhbwyaakgditdjg.supabase.co/storage/v1/object/public/netflixBucket/media/intro/netflixIntro.mp4?t=2024-08-15T15%3A11%3A37.046Z"
        autoPlay
        muted
        controls={false}
        onEnded={handleVideoEnd} // Trigger route change when video ends
      ></video>
    </>
  );
}
