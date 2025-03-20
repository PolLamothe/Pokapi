import {Button} from "@radix-ui/themes";
import {Link} from "react-router";

const ButtonLink = ({ to, children, ...props }) => {
    return (
        <Button asChild {...props} >
            <Link to={to} className="button-link">
                {children}
            </Link>
        </Button>
    );
};

export default ButtonLink;