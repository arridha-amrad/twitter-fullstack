import Image from 'next/image';

const Background = () => {
  return (
    <div className="aspect-[3/1] w-full">
      <Image
        priority
        width={500}
        height={100}
        className="h-full w-full object-cover"
        alt="background"
        src="https://pbs.twimg.com/media/FmqVSe4acAEN5qB.jpg"
      />
    </div>
  );
};

export default Background;
