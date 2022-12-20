import React, { useState, useEffect } from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import * as FeatherIcon from "react-feather";

const DialogConfirm = (props) => {
    const [open, setOpen] = useState(false);
    const [focusAfterClose, setFocusAfterClose] = useState(true);
    const {
        width,
        type = "danger",
        icon,
        title = "",
        description = "",
    } = props;
    useEffect(() => {
        setOpen(props.isOpen);
    });

    const toggle = () => setOpen(!open);

    return (
        <Modal
            returnFocusAfterClose={focusAfterClose}
            isOpen={open}
            style={{ width: width, marginTop: "15%" }}
            className="dialogConfirm-wrapper"
        >
            <ModalBody className="dialogConfirm">
                {/* {!icon ? <FeatherIcon.XOctagon className={type} /> : icon} */}
                <h4 className="title text-center font-weight-bold">
                    <span>{title}</span>
                </h4>
                <h5 className="text-center mt-3">{description}</h5>
            </ModalBody>
            <ModalFooter className="dialogConfirm-footer">
                <Button
                    color="secondary"
                    className="btn-cancel"
                    onClick={props.onCancel}
                >
                    Hủy bỏ
                </Button>
                <Button color="primary" onClick={props.onOk} className="btn-ok">
                    Đồng ý
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default DialogConfirm;
