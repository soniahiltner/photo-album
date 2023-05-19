import styles from './Tooltip.module.css'

const Tooltip = ({ text, position }) => {
  return (
    <div
      className={position === "top" ? styles.tooltipTop : styles.tooltipBottom}
    >
      <span>{text}</span>
    </div>
  );
}

export default Tooltip