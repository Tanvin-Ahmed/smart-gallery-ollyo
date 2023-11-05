import Header from "../components/gallery/Header";
import DisplayImage from "../components/gallery/DisplayImage";

const Gallery = () => {
  return (
    <section className="container mx-auto py-10">
      <div className="p-5 bg-white rounded">
        <Header />
        <hr className="text-gray-500 my-5 block" />
        <DisplayImage />
      </div>
    </section>
  );
};

export default Gallery;
