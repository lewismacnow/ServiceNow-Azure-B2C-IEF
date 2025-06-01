// Azure B2C IEF XML Policy Generator JavaScript

// XML Templates with placeholders
const xmlTemplates = {
    TrustFrameworkBase: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<TrustFrameworkPolicy xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
                      xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
                      xmlns="http://schemas.microsoft.com/online/cpim/schemas/2013/06" 
                      PolicySchemaVersion="0.3.0.0" 
                      TenantId="UPDATE_ME_TENANT.onmicrosoft.com" 
                      PolicyId="B2C_1A_TrustFrameworkBase" 
                      PublicPolicyUri="http://UPDATE_ME_TENANT.onmicrosoft.com/B2C_1A_TrustFrameworkBase">
  
  <BasePolicy>
    <TenantId>UPDATE_ME_TENANT.onmicrosoft.com</TenantId>
    <PolicyId>B2C_1A_TrustFrameworkBase</PolicyId>
  </BasePolicy>

  <BuildingBlocks>
    <ClaimsSchema>
      <ClaimType Id="objectId">
        <DisplayName>unique object Id for subject of the claims being returned</DisplayName>
        <DataType>string</DataType>
      </ClaimType>
      <ClaimType Id="message">
        <DisplayName>Will hold Hello World message</DisplayName>
        <DataType>string</DataType>
      </ClaimType>
      <ClaimType Id="correlationId">
        <DisplayName>correlation ID</DisplayName>
        <DataType>string</DataType>
      </ClaimType>
      <ClaimType Id="email">
        <DisplayName>Email Address</DisplayName>
        <DataType>string</DataType>
        <UserHelpText>Email address that can be used to contact you.</UserHelpText>
        <UserInputType>TextBox</UserInputType>
        <Restriction>
          <Pattern RegularExpression="^[a-zA-Z0-9.!#$%&amp;'^_\`{}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$" HelpText="Please enter a valid email address." />
        </Restriction>
      </ClaimType>
    </ClaimsSchema>

    <ContentDefinitions>
      <ContentDefinition Id="api.error">
        <LoadUri>~/tenant/templates/AzureBlue/exception.cshtml</LoadUri>
      </ContentDefinition>
      <ContentDefinition Id="api.idpselections">
        <LoadUri>~/tenant/templates/AzureBlue/idpSelector.cshtml</LoadUri>
      </ContentDefinition>
      <ContentDefinition Id="api.idpselections.signup">
        <LoadUri>~/tenant/templates/AzureBlue/idpSelector.cshtml</LoadUri>
      </ContentDefinition>
      <ContentDefinition Id="api.signuporsignin">
        <LoadUri>~/tenant/templates/AzureBlue/unified.cshtml</LoadUri>
      </ContentDefinition>
      <ContentDefinition Id="api.selfasserted">
        <LoadUri>~/tenant/templates/AzureBlue/selfAsserted.cshtml</LoadUri>
      </ContentDefinition>
      <ContentDefinition Id="api.selfasserted.profileupdate">
        <LoadUri>~/tenant/templates/AzureBlue/selfAsserted.cshtml</LoadUri>
      </ContentDefinition>
      <ContentDefinition Id="api.localaccountsignup">
        <LoadUri>~/tenant/templates/AzureBlue/selfAsserted.cshtml</LoadUri>
      </ContentDefinition>
      <ContentDefinition Id="api.localaccountpasswordreset">
        <LoadUri>~/tenant/templates/AzureBlue/selfAsserted.cshtml</LoadUri>
      </ContentDefinition>
      <ContentDefinition Id="api.phonefactor">
        <LoadUri>~/tenant/templates/AzureBlue/multifactor-1.0.0.cshtml</LoadUri>
      </ContentDefinition>
    </ContentDefinitions>
  </BuildingBlocks>

  <ClaimsProviders>
    <ClaimsProvider>
      <Domain>UPDATE_ME_TENANT.onmicrosoft.com</Domain>
      <DisplayName>Azure Active Directory</DisplayName>
      <TechnicalProfiles>
        <TechnicalProfile Id="AAD-Common">
          <DisplayName>Azure Active Directory</DisplayName>
          <Protocol Name="Proprietary" Handler="Web.TPEngine.Providers.AzureActiveDirectoryProvider, Web.TPEngine, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null" />
          <Metadata>
            <Item Key="ApplicationObjectId">UPDATE_ME</Item>
            <Item Key="ClientId">UPDATE_ME</Item>
          </Metadata>
          <CryptographicKeys>
            <Key Id="issuer_secret" StorageReferenceId="B2C_1A_TokenSigningKeyContainer" />
          </CryptographicKeys>
          <IncludeInSso>false</IncludeInSso>
          <UseTechnicalProfileForSessionManagement ReferenceId="SM-Noop" />
        </TechnicalProfile>
      </TechnicalProfiles>
    </ClaimsProvider>
  </ClaimsProviders>

  <UserJourneys>
    <UserJourney Id="HelloWorldJourney">
      <OrchestrationSteps>
        <OrchestrationStep Order="1" Type="SendClaims" CpimIssuerTechnicalProfileReferenceId="JwtIssuer" />
      </OrchestrationSteps>
    </UserJourney>
  </UserJourneys>

</TrustFrameworkPolicy>`,

    TrustFrameworkLocalization: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<TrustFrameworkPolicy xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
                      xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
                      xmlns="http://schemas.microsoft.com/online/cpim/schemas/2013/06" 
                      PolicySchemaVersion="0.3.0.0" 
                      TenantId="UPDATE_ME.onmicrosoft.com" 
                      PolicyId="B2C_1A_TrustFrameworkLocalization" 
                      PublicPolicyUri="http://UPDATE_ME.onmicrosoft.com/B2C_1A_TrustFrameworkLocalization">

  <BasePolicy>
    <TenantId>UPDATE_ME.onmicrosoft.com</TenantId>
    <PolicyId>B2C_1A_TrustFrameworkBase</PolicyId>
  </BasePolicy>

  <BuildingBlocks>
    <Localization Enabled="true">
      <SupportedLanguages DefaultLanguage="en">
        <SupportedLanguage>en</SupportedLanguage>
        <SupportedLanguage>es</SupportedLanguage>
      </SupportedLanguages>
      <LocalizedResources Id="api.localaccountsignup.en">
        <LocalizedStrings>
          <LocalizedString ElementType="UxElement" StringId="createaccount_link">Create new account</LocalizedString>
          <LocalizedString ElementType="UxElement" StringId="ver_sent">Verification code has been sent to your inbox:</LocalizedString>
          <LocalizedString ElementType="UxElement" StringId="ver_but_edit">Change e-mail</LocalizedString>
          <LocalizedString ElementType="UxElement" StringId="ver_but_resend">Send new code</LocalizedString>
          <LocalizedString ElementType="UxElement" StringId="ver_but_send">Send verification code</LocalizedString>
          <LocalizedString ElementType="UxElement" StringId="ver_but_verify">Verify code</LocalizedString>
          <LocalizedString ElementType="UxElement" StringId="ver_fail_code_expired">That code is expired. Please request a new code.</LocalizedString>
          <LocalizedString ElementType="UxElement" StringId="ver_fail_no_retry">You've made too many incorrect attempts. Please try again later.</LocalizedString>
          <LocalizedString ElementType="UxElement" StringId="ver_fail_retry">That code is incorrect. Please try again.</LocalizedString>
          <LocalizedString ElementType="UxElement" StringId="ver_fail_server">We are having trouble verifying your email address. Please enter a valid email address and try again.</LocalizedString>
          <LocalizedString ElementType="UxElement" StringId="ver_fail_throttled">There have been too many requests to verify this email address. Please wait a while, then try again.</LocalizedString>
          <LocalizedString ElementType="UxElement" StringId="ver_info_msg">Verification code has been sent to your inbox. Please copy it to the input box below.</LocalizedString>
          <LocalizedString ElementType="UxElement" StringId="ver_input">Verification code</LocalizedString>
          <LocalizedString ElementType="UxElement" StringId="ver_intro_msg">Verification is necessary. Please click Send button.</LocalizedString>
          <LocalizedString ElementType="UxElement" StringId="ver_success_msg">E-mail address verified. You can now continue.</LocalizedString>
          <LocalizedString ElementType="DisplayControl" ElementId="emailVerificationControl" StringId="intro_msg">Verification is necessary. Please click Send button.</LocalizedString>
          <LocalizedString ElementType="DisplayControl" ElementId="emailVerificationControl" StringId="success_send_code_msg">Verification code has been sent to your inbox. Please copy it to the input box below.</LocalizedString>
          <LocalizedString ElementType="DisplayControl" ElementId="emailVerificationControl" StringId="failure_send_code_msg">We are having trouble verifying your email address. Please enter a valid email address and try again.</LocalizedString>
          <LocalizedString ElementType="DisplayControl" ElementId="emailVerificationControl" StringId="success_verify_code_msg">E-mail address verified. You can now continue.</LocalizedString>
          <LocalizedString ElementType="DisplayControl" ElementId="emailVerificationControl" StringId="failure_verify_code_msg">That code is incorrect. Please try again.</LocalizedString>
          <LocalizedString ElementType="DisplayControl" ElementId="emailVerificationControl" StringId="but_send_code">Send verification code</LocalizedString>
          <LocalizedString ElementType="DisplayControl" ElementId="emailVerificationControl" StringId="but_verify_code">Verify code</LocalizedString>
          <LocalizedString ElementType="DisplayControl" ElementId="emailVerificationControl" StringId="but_send_new_code">Send new code</LocalizedString>
          <LocalizedString ElementType="DisplayControl" ElementId="emailVerificationControl" StringId="but_change_claims">Change e-mail</LocalizedString>
        </LocalizedStrings>
      </LocalizedResources>
    </Localization>
  </BuildingBlocks>

</TrustFrameworkPolicy>`,

    TrustFrameworkExtensions: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<TrustFrameworkPolicy xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
                      xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
                      xmlns="http://schemas.microsoft.com/online/cpim/schemas/2013/06" 
                      PolicySchemaVersion="0.3.0.0" 
                      TenantId="UPDATE_ME_TENANT.onmicrosoft.com" 
                      PolicyId="B2C_1A_TrustFrameworkExtensions" 
                      PublicPolicyUri="http://UPDATE_ME_TENANT.onmicrosoft.com/B2C_1A_TrustFrameworkExtensions">

  <BasePolicy>
    <TenantId>UPDATE_ME_TENANT.onmicrosoft.com</TenantId>
    <PolicyId>B2C_1A_TrustFrameworkLocalization</PolicyId>
  </BasePolicy>

  <BuildingBlocks>
    <ClaimsSchema>
      <ClaimType Id="extension_can_access_b2c">
        <DisplayName>Can Access B2C</DisplayName>
        <DataType>boolean</DataType>
        <UserHelpText>Can this user access B2C tenant.</UserHelpText>
      </ClaimType>
    </ClaimsSchema>
  </BuildingBlocks>

  <ClaimsProviders>
    <ClaimsProvider>
      <Domain>UPDATE_ME</Domain>
      <DisplayName>Token Issuer</DisplayName>
      <TechnicalProfiles>
        <TechnicalProfile Id="JwtIssuer">
          <DisplayName>JWT Issuer</DisplayName>
          <Protocol Name="None" />
          <OutputTokenFormat>JWT</OutputTokenFormat>
          <Metadata>
            <Item Key="client_id">ProxyIdentityExperienceFrameworkAppId</Item>
            <Item Key="IdTokenAudience">IdentityExperienceFrameworkAppId</Item>
          </Metadata>
          <CryptographicKeys>
            <Key Id="issuer_secret" StorageReferenceId="B2C_1A_TokenSigningKeyContainer" />
          </CryptographicKeys>
          <InputClaims />
          <OutputClaims />
        </TechnicalProfile>
      </TechnicalProfiles>
    </ClaimsProvider>

    <ClaimsProvider>
      <DisplayName>Session Management</DisplayName>
      <TechnicalProfiles>
        <TechnicalProfile Id="SM-Noop">
          <DisplayName>Noop Session Management Provider</DisplayName>
          <Protocol Name="Proprietary" Handler="Web.TPEngine.SSO.NoopSSOSessionProvider, Web.TPEngine, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null" />
        </TechnicalProfile>
        <TechnicalProfile Id="SM-AAD">
          <DisplayName>Session Management Provider</DisplayName>
          <Protocol Name="Proprietary" Handler="Web.TPEngine.SSO.DefaultSSOSessionProvider, Web.TPEngine, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null" />
          <PersistedClaims>
            <PersistedClaim ClaimTypeReferenceId="objectId" />
            <PersistedClaim ClaimTypeReferenceId="signInName" />
            <PersistedClaim ClaimTypeReferenceId="authenticationSource" />
            <PersistedClaim ClaimTypeReferenceId="identityProvider" />
            <PersistedClaim ClaimTypeReferenceId="newUser" />
            <PersistedClaim ClaimTypeReferenceId="executed-SelfAsserted-Input" />
          </PersistedClaims>
          <OutputClaims>
            <OutputClaim ClaimTypeReferenceId="objectIdFromSession" DefaultValue="true"/>
          </OutputClaims>
        </TechnicalProfile>
      </TechnicalProfiles>
    </ClaimsProvider>
  </ClaimsProviders>

  <UserJourneys>
    <UserJourney Id="SignUpOrSignIn">
      <OrchestrationSteps>
        <OrchestrationStep Order="1" Type="CombinedSignInAndSignUp" ContentDefinitionReferenceId="api.signuporsignin">
          <ClaimsProviderSelections>
            <ClaimsProviderSelection ValidationClaimsExchangeId="LocalAccountSigninEmailExchange" />
          </ClaimsProviderSelections>
          <ClaimsExchanges>
            <ClaimsExchange Id="LocalAccountSigninEmailExchange" TechnicalProfileReferenceId="SelfAsserted-LocalAccountSignin-Email" />
          </ClaimsExchanges>
        </OrchestrationStep>

        <OrchestrationStep Order="2" Type="ClaimsExchange" Preconditions="
          <Precondition Type="ClaimsExist" ExecuteActionsIf="true">
            <Value>objectId</Value>
            <Action>SkipThisOrchestrationStep</Action>
          </Precondition>">
          <ClaimsExchanges>
            <ClaimsExchange Id="SignUpWithLogonEmailExchange" TechnicalProfileReferenceId="LocalAccountSignUpWithLogonEmail" />
          </ClaimsExchanges>
        </OrchestrationStep>

        <OrchestrationStep Order="3" Type="ClaimsExchange" Preconditions="
          <Precondition Type="ClaimEquals" ExecuteActionsIf="true">
            <Value>authenticationSource</Value>
            <Value>localAccountAuthentication</Value>
            <Action>SkipThisOrchestrationStep</Action>
          </Precondition>">
          <ClaimsExchanges>
            <ClaimsExchange Id="AADUserReadUsingAlternativeSecurityId" TechnicalProfileReferenceId="AAD-UserReadUsingAlternativeSecurityId-NoError" />
          </ClaimsExchanges>
        </OrchestrationStep>

        <OrchestrationStep Order="4" Type="ClaimsExchange" Preconditions="
          <Precondition Type="ClaimEquals" ExecuteActionsIf="true">
            <Value>authenticationSource</Value>
            <Value>socialIdpAuthentication</Value>
            <Action>SkipThisOrchestrationStep</Action>
          </Precondition>">
          <ClaimsExchanges>
            <ClaimsExchange Id="AADUserReadUsingEmailAddress" TechnicalProfileReferenceId="AAD-UserReadUsingEmailAddress" />
          </ClaimsExchanges>
        </OrchestrationStep>

        <OrchestrationStep Order="5" Type="SendClaims" CpimIssuerTechnicalProfileReferenceId="JwtIssuer" />
      </OrchestrationSteps>
      <ClientDefinition ReferenceId="DefaultWeb" />
    </UserJourney>
  </UserJourneys>

</TrustFrameworkPolicy>`,

    SignUpOrSignin: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<TrustFrameworkPolicy xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
                      xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
                      xmlns="http://schemas.microsoft.com/online/cpim/schemas/2013/06" 
                      PolicySchemaVersion="0.3.0.0" 
                      TenantId="UPDATE_ME.onmicrosoft.com" 
                      PolicyId="B2C_1A_signup_signin" 
                      PublicPolicyUri="http://UPDATE_ME.onmicrosoft.com/B2C_1A_signup_signin">

  <BasePolicy>
    <TenantId>UPDATE_ME.onmicrosoft.com</TenantId>
    <PolicyId>B2C_1A_TrustFrameworkExtensions</PolicyId>
  </BasePolicy>

  <RelyingParty>
    <DefaultUserJourney ReferenceId="SignUpOrSignIn" />
    <TechnicalProfile Id="PolicyProfile">
      <DisplayName>PolicyProfile</DisplayName>
      <Protocol Name="OpenIdConnect" />
      <OutputClaims>
        <OutputClaim ClaimTypeReferenceId="displayName" />
        <OutputClaim ClaimTypeReferenceId="givenName" />
        <OutputClaim ClaimTypeReferenceId="surname" />
        <OutputClaim ClaimTypeReferenceId="email" />
        <OutputClaim ClaimTypeReferenceId="objectId" PartnerClaimType="sub"/>
        <OutputClaim ClaimTypeReferenceId="identityProvider" />
        <OutputClaim ClaimTypeReferenceId="tenantId" AlwaysUseDefaultValue="true" DefaultValue="{Policy:TenantObjectId}" />
      </OutputClaims>
      <SubjectNamingInfo ClaimType="sub" />
    </TechnicalProfile>
  </RelyingParty>

</TrustFrameworkPolicy>`,

    ProfileEdit: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<TrustFrameworkPolicy xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
                      xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
                      xmlns="http://schemas.microsoft.com/online/cpim/schemas/2013/06" 
                      PolicySchemaVersion="0.3.0.0" 
                      TenantId="UPDATE_ME.onmicrosoft.com" 
                      PolicyId="B2C_1A_ProfileEdit" 
                      PublicPolicyUri="http://UPDATE_ME.onmicrosoft.com/B2C_1A_ProfileEdit">

  <BasePolicy>
    <TenantId>UPDATE_ME.onmicrosoft.com</TenantId>
    <PolicyId>B2C_1A_TrustFrameworkExtensions</PolicyId>
  </BasePolicy>

  <UserJourneys>
    <UserJourney Id="ProfileEdit">
      <OrchestrationSteps>
        <OrchestrationStep Order="1" Type="ClaimsProviderSelection" ContentDefinitionReferenceId="api.idpselections">
          <ClaimsProviderSelections>
            <ClaimsProviderSelection TargetClaimsExchangeId="LocalAccountSigninEmailExchange" />
          </ClaimsProviderSelections>
        </OrchestrationStep>
        <OrchestrationStep Order="2" Type="ClaimsExchange">
          <ClaimsExchanges>
            <ClaimsExchange Id="LocalAccountSigninEmailExchange" TechnicalProfileReferenceId="SelfAsserted-LocalAccountSignin-Email" />
          </ClaimsExchanges>
        </OrchestrationStep>
        <OrchestrationStep Order="3" Type="ClaimsExchange">
          <ClaimsExchanges>
            <ClaimsExchange Id="AADUserReadWithObjectId" TechnicalProfileReferenceId="AAD-UserReadUsingObjectId" />
          </ClaimsExchanges>
        </OrchestrationStep>
        <OrchestrationStep Order="4" Type="ClaimsExchange">
          <ClaimsExchanges>
            <ClaimsExchange Id="B2CUserProfileUpdateExchange" TechnicalProfileReferenceId="SelfAsserted-ProfileUpdate" />
          </ClaimsExchanges>
        </OrchestrationStep>
        <OrchestrationStep Order="5" Type="SendClaims" CpimIssuerTechnicalProfileReferenceId="JwtIssuer" />
      </OrchestrationSteps>
      <ClientDefinition ReferenceId="DefaultWeb" />
    </UserJourney>
  </UserJourneys>

  <RelyingParty>
    <DefaultUserJourney ReferenceId="ProfileEdit" />
    <TechnicalProfile Id="PolicyProfile">
      <DisplayName>PolicyProfile</DisplayName>
      <Protocol Name="OpenIdConnect" />
      <OutputClaims>
        <OutputClaim ClaimTypeReferenceId="objectId" PartnerClaimType="sub"/>
        <OutputClaim ClaimTypeReferenceId="displayName" />
        <OutputClaim ClaimTypeReferenceId="givenName" />
        <OutputClaim ClaimTypeReferenceId="surname" />
        <OutputClaim ClaimTypeReferenceId="email" />
        <OutputClaim ClaimTypeReferenceId="tenantId" AlwaysUseDefaultValue="true" DefaultValue="{Policy:TenantObjectId}" />
      </OutputClaims>
      <SubjectNamingInfo ClaimType="sub" />
    </TechnicalProfile>
  </RelyingParty>

</TrustFrameworkPolicy>`,

    PasswordReset: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<TrustFrameworkPolicy xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
                      xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
                      xmlns="http://schemas.microsoft.com/online/cpim/schemas/2013/06" 
                      PolicySchemaVersion="0.3.0.0" 
                      TenantId="UPDATE_ME.onmicrosoft.com" 
                      PolicyId="B2C_1A_PasswordReset" 
                      PublicPolicyUri="http://UPDATE_ME.onmicrosoft.com/B2C_1A_PasswordReset">

  <BasePolicy>
    <TenantId>UPDATE_ME.onmicrosoft.com</TenantId>
    <PolicyId>B2C_1A_TrustFrameworkExtensions</PolicyId>
  </BasePolicy>

  <UserJourneys>
    <UserJourney Id="PasswordReset">
      <OrchestrationSteps>
        <OrchestrationStep Order="1" Type="ClaimsExchange">
          <ClaimsExchanges>
            <ClaimsExchange Id="PasswordResetUsingEmailAddressExchange" TechnicalProfileReferenceId="LocalAccountDiscoveryUsingEmailAddress" />
          </ClaimsExchanges>
        </OrchestrationStep>
        <OrchestrationStep Order="2" Type="ClaimsExchange">
          <ClaimsExchanges>
            <ClaimsExchange Id="NewCredentials" TechnicalProfileReferenceId="LocalAccountWritePasswordUsingObjectId" />
          </ClaimsExchanges>
        </OrchestrationStep>
        <OrchestrationStep Order="3" Type="SendClaims" CpimIssuerTechnicalProfileReferenceId="JwtIssuer" />
      </OrchestrationSteps>
      <ClientDefinition ReferenceId="DefaultWeb" />
    </UserJourney>
  </UserJourneys>

  <RelyingParty>
    <DefaultUserJourney ReferenceId="PasswordReset" />
    <TechnicalProfile Id="PolicyProfile">
      <DisplayName>PolicyProfile</DisplayName>
      <Protocol Name="OpenIdConnect" />
      <OutputClaims>
        <OutputClaim ClaimTypeReferenceId="email" />
        <OutputClaim ClaimTypeReferenceId="objectId" PartnerClaimType="sub"/>
        <OutputClaim ClaimTypeReferenceId="tenantId" AlwaysUseDefaultValue="true" DefaultValue="{Policy:TenantObjectId}" />
      </OutputClaims>
      <SubjectNamingInfo ClaimType="sub" />
    </TechnicalProfile>
  </RelyingParty>

</TrustFrameworkPolicy>`
};

// Form validation patterns
const validationPatterns = {
    tenantName: /^[a-zA-Z0-9]+$/,
    guid: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
};

// Application state
let appState = {
    formData: {},
    generatedFiles: {},
    currentStep: 1
};

// DOM elements
const form = document.getElementById('configForm');
const generateBtn = document.getElementById('generateBtn');
const downloadSection = document.getElementById('downloadSection');
const instructionsSection = document.getElementById('instructionsSection');
const generationMessage = document.getElementById('generationMessage');
const tenantRestrictionsGroup = document.getElementById('tenantRestrictionsGroup');
const enableTenantRestrictionsCheckbox = document.getElementById('enableTenantRestrictions');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    validateForm();
});

function setupEventListeners() {
    // Form input listeners
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', handleInputChange);
        input.addEventListener('blur', handleInputBlur);
    });

    // Tenant restrictions checkbox
    enableTenantRestrictionsCheckbox.addEventListener('change', function() {
        tenantRestrictionsGroup.style.display = this.checked ? 'block' : 'none';
        validateForm();
    });

    // Generate button
    generateBtn.addEventListener('click', generatePolicies);

    // Download buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('download-file-btn')) {
            const fileName = e.target.closest('.download-item').dataset.file;
            downloadFile(fileName);
        }
    });

    // Download all button
    document.getElementById('downloadAllBtn').addEventListener('click', downloadAllFiles);
}

function handleInputChange(e) {
    const { name, value } = e.target;
    appState.formData[name] = value;
    clearError(name);
    validateForm();
}

function handleInputBlur(e) {
    const { name, value } = e.target;
    validateField(name, value);
}

function validateField(fieldName, value) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(fieldName + 'Error');
    
    let isValid = true;
    let errorMessage = '';

    switch (fieldName) {
        case 'tenantName':
            if (!value) {
                isValid = false;
                errorMessage = 'Tenant name is required';
            } else if (!validationPatterns.tenantName.test(value)) {
                isValid = false;
                errorMessage = 'Tenant name must contain only alphanumeric characters';
            }
            break;

        case 'companyName':
            if (!value) {
                isValid = false;
                errorMessage = 'Company name is required';
            }
            break;

        case 'servicenowAppId':
        case 'iefAppId':
        case 'proxyIefAppId':
            if (!value) {
                isValid = false;
                errorMessage = 'This field is required';
            } else if (!validationPatterns.guid.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid GUID format';
            }
            break;

        case 'servicenowSecret':
            if (!value) {
                isValid = false;
                errorMessage = 'Client secret is required';
            } else if (value.length < 8) {
                isValid = false;
                errorMessage = 'Client secret must be at least 8 characters';
            }
            break;

        case 'tenantRestrictions':
            if (enableTenantRestrictionsCheckbox.checked && value) {
                const tenants = value.split(',').map(t => t.trim());
                const invalidTenants = tenants.filter(t => t && !validationPatterns.guid.test(t));
                if (invalidTenants.length > 0) {
                    isValid = false;
                    errorMessage = 'All tenant IDs must be in valid GUID format';
                }
            }
            break;
    }

    if (isValid) {
        field.classList.remove('error');
        field.classList.add('success');
        errorElement.classList.remove('show');
    } else {
        field.classList.add('error');
        field.classList.remove('success');
        errorElement.textContent = errorMessage;
        errorElement.classList.add('show');
    }

    return isValid;
}

function clearError(fieldName) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(fieldName + 'Error');
    
    field.classList.remove('error');
    errorElement.classList.remove('show');
}

function validateForm() {
    const requiredFields = ['tenantName', 'companyName', 'servicenowAppId', 'servicenowSecret', 'iefAppId', 'proxyIefAppId'];
    let isValid = true;

    for (const fieldName of requiredFields) {
        const value = document.getElementById(fieldName).value;
        if (!value || !validateField(fieldName, value)) {
            isValid = false;
        }
    }

    // Validate tenant restrictions if enabled
    if (enableTenantRestrictionsCheckbox.checked) {
        const tenantRestrictions = document.getElementById('tenantRestrictions').value;
        if (!validateField('tenantRestrictions', tenantRestrictions)) {
            isValid = false;
        }
    }

    generateBtn.disabled = !isValid;
    return isValid;
}

function updateProgressStep(step) {
    const steps = document.querySelectorAll('.progress-step');
    
    steps.forEach((stepEl, index) => {
        stepEl.classList.remove('active', 'completed');
        if (index + 1 < step) {
            stepEl.classList.add('completed');
        } else if (index + 1 === step) {
            stepEl.classList.add('active');
        }
    });
    
    appState.currentStep = step;
}

function showMessage(text, type = 'success') {
    generationMessage.textContent = text;
    generationMessage.className = `message ${type}`;
    generationMessage.style.display = 'block';
}

function hideMessage() {
    generationMessage.style.display = 'none';
}

async function generatePolicies() {
    if (!validateForm()) {
        showMessage('Please correct the form errors before generating policies.', 'error');
        return;
    }

    // Update UI to loading state
    generateBtn.classList.add('btn--loading');
    generateBtn.disabled = true;
    const btnText = generateBtn.querySelector('.btn-text');
    const spinner = generateBtn.querySelector('.spinner');
    btnText.textContent = 'Generating...';
    spinner.style.display = 'inline-block';
    
    hideMessage();
    updateProgressStep(2);

    try {
        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Collect form data
        const formData = new FormData(form);
        const config = {};
        for (let [key, value] of formData.entries()) {
            config[key] = value;
        }

        // Generate XML files
        appState.generatedFiles = generateXMLFiles(config);

        // Show success message
        showMessage('XML policies generated successfully! You can now download the files below.');
        
        // Update progress and show download section
        updateProgressStep(3);
        downloadSection.style.display = 'block';
        instructionsSection.style.display = 'block';

        // Scroll to download section
        downloadSection.scrollIntoView({ behavior: 'smooth' });

    } catch (error) {
        console.error('Error generating policies:', error);
        showMessage('An error occurred while generating the policies. Please try again.', 'error');
        updateProgressStep(1);
    } finally {
        // Reset button state
        generateBtn.classList.remove('btn--loading');
        generateBtn.disabled = false;
        btnText.textContent = 'Generate XML Policies';
        spinner.style.display = 'none';
    }
}

function generateXMLFiles(config) {
    const files = {};
    
    for (const [templateName, template] of Object.entries(xmlTemplates)) {
        let content = template;
        
        // Replace placeholders
        content = content.replace(/UPDATE_ME_TENANT/g, config.tenantName);
        content = content.replace(/UPDATE_ME/g, config.tenantName);
        content = content.replace(/ProxyIdentityExperienceFrameworkAppId/g, config.proxyIefAppId);
        content = content.replace(/IdentityExperienceFrameworkAppId/g, config.iefAppId);
        
        // Add tenant restrictions if enabled
        if (config.enableTenantRestrictions && config.tenantRestrictions) {
            const tenants = config.tenantRestrictions.split(',').map(t => t.trim()).filter(t => t);
            // This would be used in specific technical profiles - simplified for demo
        }
        
        files[templateName] = content;
    }
    
    return files;
}

function downloadFile(fileName) {
    const content = appState.generatedFiles[fileName];
    if (!content) {
        showMessage('File not found. Please regenerate the policies.', 'error');
        return;
    }

    const blob = new Blob([content], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.xml`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

async function downloadAllFiles() {
    if (Object.keys(appState.generatedFiles).length === 0) {
        showMessage('No files to download. Please generate policies first.', 'error');
        return;
    }

    try {
        // Import JSZip dynamically (for demo purposes, we'll create a simple archive)
        const zip = await createZipFile();
        
        const blob = new Blob([zip], { type: 'application/zip' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'azure-b2c-ief-policies.zip';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
    } catch (error) {
        console.error('Error creating ZIP file:', error);
        showMessage('Error creating ZIP file. Please download files individually.', 'error');
    }
}

// Simple ZIP creation (for demonstration - in production, use a proper ZIP library)
async function createZipFile() {
    // This is a simplified implementation
    // In a real application, you would use a library like JSZip
    let zipContent = '';
    
    for (const [fileName, content] of Object.entries(appState.generatedFiles)) {
        zipContent += `\n--- ${fileName}.xml ---\n${content}\n`;
    }
    
    return zipContent;
}