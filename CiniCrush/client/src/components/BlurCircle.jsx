const BlurCircle = ({ top = "auto", right = "auto", left = "auto", bottom = "auto" }) => {
  return (
    <div
      className="absolute -z-50 h-[400px] w-[400px] aspect-square rounded-full 
      blur-[110px] bg-gradient-to-r from-primary to-[#ff8065]
      opacity-60 animate-blob"
      style={{ top, right, left, bottom }}
    />
  )
}

export default BlurCircle
