import React, { useEffect } from 'react'
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import NotificationList from 'data/Notification';
import Link from 'next/link';
import { toast } from 'react-toastify';
import {
    Row,
    Col,
    Image,
    Dropdown,
    ListGroup,
} from 'react-bootstrap';

import SimpleBar from 'simplebar-react';
function MobileMenu() {


    const router = useRouter();
    const handleSignOut = () => {
        Cookies.remove("userInfo");
        router.push("/authentication/sign-in");
        toast.success('Logout successfully!');

    };


    useEffect(() => {
        const userInfo = Cookies.get("userInfo");
        if (!userInfo) {
            router.push("/");
        }
    }, []);





    const Notifications = () => {
        return (
            <SimpleBar style={{ maxHeight: '300px' }}>
                <ListGroup variant="flush">
                    {NotificationList.map(function (item, index) {
                        return (
                            <ListGroup.Item className={index === 0 ? 'bg-light' : ''} key={index}>
                                <Row>
                                    <Col>
                                        <Link href="#" className="text-muted">
                                            <h5 className=" mb-1">{item.sender}</h5>
                                            <p className="mb-0"> {item.message}</p>
                                        </Link>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        );
                    })}
                </ListGroup>
            </SimpleBar>
        );
    }




    return (
        <ListGroup as="ul" bsPrefix='navbar-nav' className="navbar-right-wrap ms-auto d-flex nav-top-wrap">
            <Dropdown as="li" className="stopevent">
                <Dropdown.Toggle as="a"
                    bsPrefix=' '
                    id="dropdownNotification"
                    className="btn btn-light btn-icon rounded-circle indicator indicator-primary text-muted">
                    <i className="fe fe-bell"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu
                    className="dashboard-dropdown notifications-dropdown dropdown-menu-lg dropdown-menu-end py-0"
                    aria-labelledby="dropdownNotification"
                    align="end"
                >
                    <Dropdown.Item className="mt-3" bsPrefix=' ' as="div"  >
                        <div className="border-bottom px-3 pt-0 pb-3 d-flex justify-content-between align-items-end">
                            <span className="h4 mb-0">Notifications</span>
                            <Link href="/" className="text-muted">
                                <span className="align-middle">
                                    <i className="fe fe-settings me-1"></i>
                                </span>
                            </Link>
                        </div>
                        <Notifications />
                        <div className="border-top px-3 pt-3 pb-3">
                            <Link href="/dashboard/notification-history" className="text-link fw-semi-bold">
                                See all Notifications
                            </Link>
                        </div>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown as="li" className="ms-2">
                <Dropdown.Toggle
                    as="a"
                    bsPrefix=' '
                    className="rounded-circle"
                    id="dropdownUser">
                    <div className="avatar avatar-md avatar-indicators avatar-online">
                        <Image alt="avatar" src='/images/avatar/avatar-1.jpg' className="rounded-circle" />
                    </div>
                </Dropdown.Toggle>
                <Dropdown.Menu
                    className="dropdown-menu dropdown-menu-end "
                    align="end"
                    aria-labelledby="dropdownUser"
                >
                    <Dropdown.Item as="div" className="px-4 pb-0 pt-2" bsPrefix=' '>
                        <div className="lh-1 ">
                            <h5 className="mb-1"> John E. Grainger</h5>
                            <Link href="#" className="text-inherit fs-6">View my profile</Link>
                        </div>
                        <div className=" dropdown-divider mt-3 mb-2"></div>
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="2">
                        <i className="fe fe-user me-2"></i> Edit Profile
                    </Dropdown.Item>

                    <Dropdown.Item onClick={handleSignOut}>
                        <i className="fe fe-power me-2"></i>Sign Out
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </ListGroup>
    )
}

export default MobileMenu