function LinkBox (props) {
const Icon = props.icon;
  
  return (
      <a href={props.href} className="flex gap-1 items-center">
        <Icon />
        <div>
            <p>{props.label}</p>
        </div>
      </a>
  )
}

export default LinkBox;