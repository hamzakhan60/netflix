

const VideoOverlay = () => {
  return (
    <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black via-transparent to-transparent text-white">
      <div>
        <h1 className="text-5xl font-bold">Narcos</h1>
        <p className="mt-4">[Steve] In war, good and bad are relative concepts.</p>
        <button className="mt-4 bg-white text-black py-2 px-4 rounded">Play</button>
        <button className="mt-4 ml-2 bg-gray-700 bg-opacity-50 text-white py-2 px-4 rounded">More Info</button>
      </div>
      <p className="mt-4">US Crime TV Thrillers</p>
    </div>
  );
};

export default VideoOverlay;
