import Feed from "@/components/Feed";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">Discover & Share
      <br className=""/>
      <span className="orange_gradient">Prompts</span></h1>
      <p className="desc text-center">InfoStream is a platform for users to discover, create and share creative information.</p>  
      <Feed/>
      </section>
    </>
  );
}
