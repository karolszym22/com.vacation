
import {useDispatch } from "react-redux";
import { user } from "../../Components/Actions/actions";

interface Props {
  children?: JSX.Element;
}

const MainTemplate = ({ children }: Props) => {

    const dispatch = useDispatch();

    const storedUser = localStorage.getItem("user");
  if (storedUser) {
    const userData = JSON.parse(storedUser);
    dispatch(
      user({
        id: userData.id,
        name: userData.username,
        email: userData.email,
        employerType: userData.employerType
      })
    );
  }


  return <>{children}</>;
};

export default MainTemplate;
