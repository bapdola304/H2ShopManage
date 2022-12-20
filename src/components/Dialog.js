import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// import "./index.scss";
import classnames from "classnames";


const Dialog = (props) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        showHideDialog(props.visible);
    }, [props.visible]);

    const showHideDialog = (flag) => {
        setVisible(flag);
    };

    const { isShowFooter = true, children, title = "" } = props;

    return (
        <div className="dialog">
            <Modal
                isOpen={visible}
                className={classnames("dialog-wrapper", props.className)}
                style={{ marginTop: "10%", width: "80%" }}
            >
                <ModalHeader toggle={props.onCancel}>{title}</ModalHeader>
                <ModalBody>{children}</ModalBody>
                {isShowFooter && (
                    <ModalFooter>
                        <Button
                            color="secondary"
                            onClick={props.onBtnLeftAction}
                            className="btn-cancel"
                        >
                            {props.btnLeftText}
                        </Button>{" "}
                        <Button
                            color="primary"
                            type="submit"
                            onClick={props.onBtnRightAction}
                            className="btn-ok"
                        >
                            {props.btnRightText}
                        </Button>
                    </ModalFooter>
                )}
            </Modal>
        </div>
    );
};

export default Dialog;
