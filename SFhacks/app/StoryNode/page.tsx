import Image from "next/image";

export default function Page() {
  const options = ["hi", "2", "3"];
  return (
    <div className="h-full flex flex-row">
      <div className="w-3/4">
        <Image
          // TODO: add image src, maybe modify the gradient as well
          src="/fairy_placeholder.png"
          alt="placeholder"
          className="relative object-cover h-full w-full right-0"
          style={{
            maskImage:
              "linear-gradient(to right, rgba(0, 0, 0, 1.0) 0%, transparent 100%)",
            maskRepeat: "no-repeat",
            maskSize: "contain",
          }}
          width={900}
          height={600}
        />
        <div className="fixed h-full w-full" />
      </div>
      <div className="fixed w-1/3 flex flex-col items-center text-black right-0">
        {/* make a form with radio buttons for each option */}
        <p className="m-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
          mollitia, molestiae quas vel sint commodi repudiandae consequuntur
          voluptatum laborum numquam blanditiis harum quisquam eius sed odit
          fugiat iusto fuga praesentium optio, eaque rerum! Provident similique
          accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut
          molestias architecto voluptate aliquam nihil, eveniet aliquid culpa
          officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum
          nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque
          error repudiandae fuga?
        </p>
        <form className="w-3/4 m-8 p-4 border-purple-500 border-2 rounded-md">
          {options.map((option, index) => {
            const str = index.toString();
            return (
              <div>
                <input
                  type="radio"
                  name="option"
                  id={str}
                  value={str}
                  key={str}
                />
                <label>{option}</label>
              </div>
            );
          })}
        </form>
      </div>
    </div>
  );
}
