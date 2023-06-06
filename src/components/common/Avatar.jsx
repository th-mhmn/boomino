const Avatar = ({ src, alt, className }) => {
  return (
    <div className={`rounded-full overflow-hidden w-14 h-14 ${className}`}>
      <img className={"w-full h-full"} src={src} alt={alt} />
    </div>
  );
};

export default Avatar;
