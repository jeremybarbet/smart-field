import * as React from 'react';
// import { TextInput } from '@contentful/forma-36-react-components';
import { ConnectedRichTextEditor } from '@contentful/field-editor-rich-text';
import { FieldConnector, FieldExtensionSDK } from '@contentful/field-editor-shared';
import { EntityProvider } from '@contentful/field-editor-reference';
import { Value } from 'slate';
import deepEquals from 'fast-deep-equal';
import { EMPTY_DOCUMENT } from '@contentful/rich-text-types';

import * as styles from './styles';

export interface SmartFieldEditorProps {
  /**
   * is the field disabled initially
   */
  isInitiallyDisabled: boolean;

  /**
   * whether char validation should be shown or not
   */
  withCharValidation: boolean;

  /**
   * sdk
   */
  sdk: FieldExtensionSDK;
}

export function SmartFieldEditor(props: SmartFieldEditorProps) {
  const { sdk, isInitiallyDisabled, ...rest } = props;

  console.log('-sdk', sdk);
  console.log('-yo', sdk.field.getValue());

  return (
    <EntityProvider sdk={sdk}>
      <FieldConnector<string>
        throttle={0}
        field={sdk.field}
        isInitiallyDisabled={isInitiallyDisabled}
        isEmptyValue={(value) => {
          return !value || deepEquals(value, EMPTY_DOCUMENT);
        }}
        isEqualValues={(value1, value2) => {
          return deepEquals(value1, value2);
        }}>
        {({ lastRemoteValue, disabled, setValue }) => {
          return (
            <div className={styles.wrapper} data-test-id="smart-field-editor">
              <ConnectedRichTextEditor
                {...rest}
                isToolbarHidden={true}
                key="something-here-thats-amazing"
                value={lastRemoteValue}
                sdk={sdk}
                isDisabled={disabled}
                onChange={(v: string) => setValue(v)}
              />
            </div>
          );
        }}
      </FieldConnector>
    </EntityProvider>
  );
}

SmartFieldEditor.defaultProps = {
  isInitiallyDisabled: true,
  withCharValidation: true,
};
