import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import {
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHeader,
  EuiText,
  EuiTextColor,
} from "@elastic/eui";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "../utils/FirebaseConfig";
import {
  getCreateMeetingBreadCrumb,
  getMeetingsBreadCrumbs,
  getMyMeetingsBreadCrumbs,
  getOneonOneMeetingsBreadCrumbs,
  getVideoConferenceBreadCrumbs,
} from "../utils/breadCrumbs";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const username = useAppSelector((zoom) => zoom.auth.userInfo?.name);
  const [breadcrums, setBreadcrums] = useState([{ text: "Dashboard" }]);
  // const dispatch = useAppDispatch();
  const [isResponsive, setIsResponsive] = useState(false);

  const logout = () => {
    signOut(firebaseAuth);
  };

  useEffect(() => {
    const { pathname } = location;
    if (pathname === "/create") {
      setBreadcrums(getCreateMeetingBreadCrumb(navigate));
    } else if (pathname === "/create1on1") {
      setBreadcrums(getOneonOneMeetingsBreadCrumbs(navigate));
    } else if (pathname === "/videoconference") {
      setBreadcrums(getVideoConferenceBreadCrumbs(navigate));
    } else if (pathname === "/mymeetings") {
      setBreadcrums(getMyMeetingsBreadCrumbs(navigate));
    } else if (pathname === "/meetings") {
      setBreadcrums(getMeetingsBreadCrumbs(navigate));
    }
  }, [location, navigate]);

  const section = [
    {
      items: [
        <Link to="/">
          <EuiText>
            <h2 style={{ padding: "0 1vw" }}>
              <EuiTextColor color="#0b5cff">Zoom</EuiTextColor>
            </h2>
          </EuiText>
        </Link>,
      ],
    },
    {
      items: [
        <>
          {username ? (
            <EuiText>
              <h3>
                <EuiTextColor color="white">Hello, </EuiTextColor>
                <EuiTextColor color="#0b5cff">{username}</EuiTextColor>
              </h3>
            </EuiText>
          ) : null}
        </>,
      ],
    },
    {
      items: [
        <EuiFlexGroup
          justifyContent="center"
          alignItems="center"
          direction="row"
          style={{ gap: "2vw" }}
        >
          <EuiFlexItem grow={false} style={{ flexBasis: "fit-content" }}>
            <EuiButtonIcon
              onClick={logout}
              iconType="lock"
              display="fill"
              size="s"
              aria-label="logout-button"
            />
          </EuiFlexItem>
        </EuiFlexGroup>,
      ],
    },
  ];
  const responsiveSection = [
    {
      items: [
        <Link to="/">
          <EuiText>
            <h2 style={{ padding: "0 1vw" }}>
              <EuiTextColor color="#0b5cff">Zoom</EuiTextColor>
            </h2>
          </EuiText>
        </Link>,
      ],
    },
  ];
  useEffect(() => {
    if (window.innerWidth < 480) setIsResponsive(true);
  }, []);
  return (
    <>
      <EuiHeader
        style={{ minHeight: "8vh" }}
        theme="dark"
        sections={isResponsive ? responsiveSection : section}
      />
      <EuiHeader
        style={{ minHeight: "8vh" }}
        sections={[{ breadcrumbs: breadcrums }]}
      />
    </>
  );
}

export default Header;
