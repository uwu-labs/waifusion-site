// Frameworks
import React from 'react';
import { Heading, Button, Loader } from 'rimble-ui';


const PendingButton = ({isPending, clickEvent, text}) => {
    return (
        <>
            <Button.Outline onClick={clickEvent}>
                {!isPending &&
                    <span>{text}</span>
                }
                {isPending &&
                    <>
                        <Loader color="white" disabled={!isPending}> Pending Transaction</Loader>
                        <span>Pending Transaction</span>
                   </>
                }
            </Button.Outline>
        </>
    )
};

export default PendingButton;
