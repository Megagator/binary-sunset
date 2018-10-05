import Header from "./Header";
import Footer from "./Footer";

const Fragment = React.Fragment;

const Layout = props => (
	<Fragment>
		<Header />
		{props.children}
		<Footer />
	</Fragment>
);

export default Layout;
