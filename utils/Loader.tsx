'use client'

const Loader = () => {
  return (
    <div className="relative w-5 h-5 rotate-[165deg]" role="status" aria-label="Loading">
      <div className="loader-before" />
      <div className="loader-after" />
    </div>
  );
};

export default Loader;