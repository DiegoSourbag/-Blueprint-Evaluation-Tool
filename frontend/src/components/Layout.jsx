import styles from "../styles/App.css";
import Meta from "./Meta";
import Navigationbar from "./navigationbar";

const Layout = ({ children }) => {
  return (
    <>
        <Meta title="blueprint-evaluation"/>
        <Navigationbar />
        <div className={styles.container}>
          <div className={styles.main}> 
              { children }
          </div>
        </div>
    </>
  )
}

export default Layout