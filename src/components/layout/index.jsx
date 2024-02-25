import "./styles.css";

const Layout = (props) => {
  const { children } = props;

  return (
    <div>
      <div className="content">{children}</div>
    </div>
  );
};

export default Layout;
