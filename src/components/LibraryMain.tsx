import LibFilter from "./LibFilter";

const LibraryMain = () => {
  return (
    <div className="min-w-84 bg-charcoal-black w-full rounded-4xl px-5 py-10">
      <div className="mb-5.5 flex items-center justify-between md:mb-5">
        <h1 className="text-xl leading-none font-bold tracking-tight md:text-[28px] md:leading-8 md:tracking-wide">
          My library
        </h1>
        <LibFilter />
      </div>
      <div>books</div>
    </div>
  );
};

export default LibraryMain;
