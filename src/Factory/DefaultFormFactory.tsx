import {FormFactory} from "./FormFactory";
import {FieldTypeMap, FormConfiguration} from "./DefaultFormFactoryConfiguration";
import React, {ReactElement} from "react";
import {FieldProps} from "../Field/FieldProps";
import {Form} from "../Form/Form";
import {Button} from "../Form/Button/Button";

export class DefaultFormFactory<TFieldProps extends FieldProps = FieldProps, TExtraOptions = any>
    implements FormFactory<FormConfiguration<TFieldProps, TExtraOptions>> {

    protected readonly fieldTypeMap: FieldTypeMap;

    public constructor(fieldComponents: FieldTypeMap) {
        this.fieldTypeMap = fieldComponents;
    }

    create(configuration: FormConfiguration<TFieldProps, TExtraOptions>): React.ReactElement {
        const formProps = configuration.formConfig;
        return <Form {...formProps}>
            {
                this.renderFields(configuration)
            }
            {
                this.renderButton()
            }
        </Form>;
    }


    protected getFieldElement(type: keyof FieldTypeMap, fieldProps: TFieldProps) {
        const FieldComponent = this.fieldTypeMap[type];
        return <FieldComponent key={fieldProps.name} {...fieldProps} />;
    }

    protected renderFields(configuration: FormConfiguration<TFieldProps, TExtraOptions>): ReactElement | ReactElement[] {
        const fields = configuration.fieldConfig;
        const keys = Object.keys(fields);
        return keys.map(key => {
            const fieldProps = fields[key].fieldConfig;
            const type = fields[key].type;
            return this.getFieldElement(type, fieldProps);
        });
    }

    protected renderButton(): any {
        return <Button render={serviceFactory => {
            return <button onClick={async e => {
                e.preventDefault();
                const submit = serviceFactory.createSubmitService();
                await submit.submit();
            }}>SUBMIT</button>
        }}/>;
    }


}