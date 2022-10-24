import React from "react";
import { Input, VerticalInputGroup } from "../../components/Input";
import { TitleBar } from "../../components/TitleBar";
import { Center } from "../../components/Util";

class ConfirmEmail extends React.Component {
    render() {
        return (
            <div>
                <TitleBar title="Confirm Email" />
                <Center>
                    <Input type="number" placeholder="Confirmation Number" />
                </Center>
            </div>
        );
    }
}

export class CreateAccount extends React.Component {
    render() {
        return (
            <div>
                <TitleBar title="Create Account" />
                <Center>
                    <div>
                        <Input type="email" placeholder="Email" />
                    </div>
                    <VerticalInputGroup>
                        <Input type="password" placeholder="Passphrase" />
                        <Input
                            type="password"
                            placeholder="Confirm Passphrase"
                        />
                    </VerticalInputGroup>
                </Center>
            </div>
        );
    }
}
