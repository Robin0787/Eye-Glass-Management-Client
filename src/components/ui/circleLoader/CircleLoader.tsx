import styles from "./CircleLoader.module.css";

const CircleLoader = ({ loader = false, height = "48px", width = "48px" }) => {
  if (loader) {
    return (
      <span
        className={styles.loader}
        style={{ height: height, width: width }}
      ></span>
    );
  }
  return <></>;
};

export default CircleLoader;
