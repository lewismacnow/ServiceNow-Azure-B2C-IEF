# Azure B2C Identity Experience Framework (IEF) Setup Guide

## Complete Guide for OpenID Connect with Automated XML Generation

### Overview

This comprehensive guide simplifies the Azure Active Directory B2C Identity Experience Framework setup process. Instead of the traditional 58+ manual tasks, this guide provides an automated approach that reduces manual work by 70-80% while ensuring accuracy and consistency.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Architecture Overview](#architecture-overview)
3. [Phase 1: Azure Portal Preparation](#phase-1-azure-portal-preparation)
4. [Phase 2: Application Registration](#phase-2-application-registration)
5. [Phase 3: Policy Keys Configuration](#phase-3-policy-keys-configuration)
6. [Phase 4: XML Policy Generation](#phase-4-xml-policy-generation)
7. [Phase 5: Policy Upload and Testing](#phase-5-policy-upload-and-testing)
8. [Troubleshooting](#troubleshooting)
9. [Best Practices](#best-practices)

## Prerequisites

Before starting, ensure you have:

- **Azure Subscription** with Azure AD B2C tenant
- **Global Administrator** access to the B2C tenant
- **ServiceNow application** or target application details
- **Basic understanding** of OpenID Connect flow
- **Visual Studio Code** (recommended for XML editing)

## Architecture Overview

The Azure B2C IEF enables seamless single sign-on through:

```
User → Application → Azure B2C IEF → Azure AD/External IdP → User Profile Creation → Token Issuance
```

### Key Components

1. **Identity Experience Framework Applications**
   - `IdentityExperienceFramework` (Web API)
   - `ProxyIdentityExperienceFramework` (Native App)

2. **Policy Keys**
   - Token Signing Key
   - Token Encryption Key
   - Application Secrets

3. **XML Policy Files**
   - `TrustFrameworkBase.xml` (Foundation)
   - `TrustFrameworkLocalization.xml` (Localization)
   - `TrustFrameworkExtensions.xml` (Customizations)
   - `SignUpOrSignin.xml` (Entry Policy)
   - `ProfileEdit.xml` (Profile Management)
   - `PasswordReset.xml` (Password Recovery)

## Phase 1: Azure Portal Preparation

### Step 1.1: Access Your B2C Tenant

1. Navigate to the **Azure Portal** (https://portal.azure.com)
2. Select your **Azure AD B2C tenant** from the directory filter
3. Search for and select **Azure AD B2C**
4. Note your tenant name: `{your-tenant}.onmicrosoft.com`

### Step 1.2: Enable Identity Experience Framework

1. In Azure AD B2C overview, go to **Policies** → **Identity Experience Framework**
2. If not enabled, follow the setup wizard

## Phase 2: Application Registration

### Step 2.1: Create IdentityExperienceFramework Application

1. Navigate to **App registrations** → **New registration**
2. Configure:
   - **Name**: `IdentityExperienceFramework`
   - **Supported account types**: Accounts in this organizational directory only
   - **Redirect URI**: Web - `https://{your-tenant}.b2clogin.com/{your-tenant}.onmicrosoft.com`
3. **Register** and note the **Application (client) ID**

#### Expose API Scope
1. Go to **Expose an API** → **Add a scope**
2. Accept default Application ID URI
3. Configure scope:
   - **Scope name**: `user_impersonation`
   - **Admin consent display name**: `Access IdentityExperienceFramework`
   - **Admin consent description**: `Allow the application to access IdentityExperienceFramework on behalf of the signed-in user`

### Step 2.2: Create ProxyIdentityExperienceFramework Application

1. **App registrations** → **New registration**
2. Configure:
   - **Name**: `ProxyIdentityExperienceFramework`
   - **Supported account types**: Accounts in this organizational directory only
   - **Redirect URI**: Public client/native - `myapp://auth`
3. **Register** and note the **Application (client) ID**

#### Configure as Public Client
1. Go to **Authentication** → **Advanced settings**
2. Set **Enable the following mobile and desktop flows** to **Yes**
3. **Save**

#### Grant API Permissions
1. Go to **API permissions** → **Add a permission**
2. Select **My APIs** → **IdentityExperienceFramework**
3. Select **user_impersonation** scope
4. **Add permissions**
5. **Grant admin consent** for your tenant

### Step 2.3: Register Your Target Application (ServiceNow)

1. **App registrations** → **New registration**
2. Configure for your ServiceNow instance:
   - **Name**: `{Company Name} ServiceNow`
   - **Redirect URI**: Configure based on ServiceNow requirements
3. **Register** and note the **Application (client) ID**
4. Generate a **client secret** and note it securely

## Phase 3: Policy Keys Configuration

### Step 3.1: Create Signing and Encryption Keys

Navigate to **Identity Experience Framework** → **Policy Keys**

#### Token Signing Key
1. **Add** → **Generate**
2. **Name**: `TokenSigningKeyContainer`
3. **Key type**: RSA
4. **Key usage**: Signature
5. **Create**

#### Token Encryption Key
1. **Add** → **Generate**
2. **Name**: `TokenEncryptionKeyContainer`
3. **Key type**: RSA
4. **Key usage**: Encryption
5. **Create**

### Step 3.2: Create Application Secret Key

1. **Add** → **Manual**
2. **Name**: `AADAppSecret`
3. **Secret**: Enter your ServiceNow application client secret
4. **Key usage**: Signature
5. **Create**

### Step 3.3: Create Facebook Dummy Key

Even if not using Facebook, this key is required:

1. **Add** → **Manual**
2. **Name**: `FacebookSecret`
3. **Secret**: `12345`
4. **Key usage**: Signature
5. **Create**

## Phase 4: XML Policy Generation

### Step 4.1: Gather Required Information

Collect these values for XML generation:
- **Tenant Name**: `{your-tenant}.onmicrosoft.com`
- **IdentityExperienceFramework App ID**: From Step 2.1
- **ProxyIdentityExperienceFramework App ID**: From Step 2.2
- **ServiceNow App ID**: From Step 2.3
- **Company Name**: For display purposes
- **Optional Tenant Restrictions**: Comma-separated list of allowed tenant IDs

### Step 4.2: XML Configuration Patterns

The automated tool will replace these placeholders:

```xml
<!-- Primary placeholders -->
UPDATE_ME_TENANT → {your-tenant}
UPDATE_ME → {your-tenant} or specific app IDs

<!-- Application-specific -->
ProxyIdentityExperienceFrameworkAppId → {proxy-app-id}
IdentityExperienceFrameworkAppId → {ief-app-id}
{ServiceNow-app-id} → {your-servicenow-app-id}

<!-- Optional tenant restrictions -->
<!-- {allowed-tenant-ids} → comma-separated tenant list -->
```

### Step 4.3: Use the Automated XML Generator

The companion web application will:
1. Load the base XML templates
2. Replace all placeholders with your values
3. Validate XML structure
4. Generate downloadable policy files
5. Provide upload instructions

## Phase 5: Policy Upload and Testing

### Step 5.1: Upload Policies in Correct Order

Upload in this **exact sequence**:
1. `TrustFrameworkBase.xml`
2. `TrustFrameworkLocalization.xml`
3. `TrustFrameworkExtensions.xml`
4. `SignUpOrSignin.xml`
5. `ProfileEdit.xml`
6. `PasswordReset.xml`

For each file:
1. **Identity Experience Framework** → **Upload custom policy**
2. Select file and **Upload**
3. Verify successful upload before proceeding

### Step 5.2: Configure Test Application

1. Select **B2C_1A_signup_signin** policy
2. **Select application**: Choose your ServiceNow app
3. **Reply URL**: Set to `https://jwt.ms` for testing
4. **Run now**

### Step 5.3: Test User Journey

1. **First Test**: Sign up with new email
2. **Second Test**: Sign in with existing account
3. **Third Test**: Test profile editing
4. Verify JWT token contains expected claims

## Troubleshooting

### Common Issues and Solutions

#### Upload Errors
- **Invalid XML**: Use XML validator with B2C schema
- **Missing dependencies**: Ensure correct upload order
- **Placeholder errors**: Verify all placeholders are replaced

#### Authentication Failures
- **Invalid client_id**: Check application registration
- **Scope errors**: Verify API permissions are granted
- **Redirect URI mismatch**: Ensure exact match in app registration

#### Policy Execution Errors
- **Technical profile not found**: Check reference IDs
- **Claims transformation errors**: Validate claim types
- **Missing policy keys**: Verify all keys are created

### Debugging Tools

1. **Application Insights**: Enable for detailed logging
2. **JWT.ms**: Decode and validate tokens
3. **B2C VS Code Extension**: XML validation and navigation
4. **Browser Developer Tools**: Network tab for request/response

## Best Practices

### Security
- **Rotate keys regularly**: Update signing and encryption keys
- **Limit tenant access**: Use tenant restrictions when appropriate
- **Monitor failed attempts**: Set up alerts for suspicious activity
- **Use HTTPS only**: Ensure all redirect URIs use HTTPS

### Development
- **Version control**: Store policies in Git repository
- **Environment separation**: Use different tenants for dev/test/prod
- **Automated deployment**: Use Azure DevOps or GitHub Actions
- **Policy validation**: Always validate before upload

### Maintenance
- **Regular updates**: Keep starter pack policies current
- **Documentation**: Maintain policy change documentation
- **Testing**: Regularly test all user journeys
- **Backup**: Keep backups of working policy configurations

## Advanced Configuration

### Custom Claims
Add custom claims to collect additional user information:

```xml
<ClaimType Id="department">
  <DisplayName>Department</DisplayName>
  <DataType>string</DataType>
  <UserInputType>TextBox</UserInputType>
</ClaimType>
```

### REST API Integration
Integrate with external APIs for enhanced functionality:

```xml
<TechnicalProfile Id="REST-ValidateUser">
  <DisplayName>Validate User</DisplayName>
  <Protocol Name="Proprietary" Handler="Web.TPEngine.Providers.RestfulProvider, Web.TPEngine, Version=1.0.0.0" />
  <Metadata>
    <Item Key="ServiceUrl">https://api.company.com/validate</Item>
    <Item Key="HttpBinding">POST</Item>
  </Metadata>
</TechnicalProfile>
```

### Multi-Language Support
Configure localization for multiple languages:

```xml
<SupportedLanguages DefaultLanguage="en" MergeBehavior="ReplaceAll">
  <SupportedLanguage>en</SupportedLanguage>
  <SupportedLanguage>es</SupportedLanguage>
  <SupportedLanguage>fr</SupportedLanguage>
</SupportedLanguages>
```

## Conclusion

This guide transforms the complex Azure B2C IEF setup from a 58-step manual process into a streamlined, automated workflow. By using the companion web application and following these best practices, you can:

- **Reduce setup time by 70-80%**
- **Eliminate configuration errors**
- **Ensure consistent deployments**
- **Maintain secure, scalable identity solutions**

The automated approach not only saves time but also reduces the likelihood of errors that can cause authentication failures or security vulnerabilities.

## Additional Resources

- [Azure B2C Documentation](https://docs.microsoft.com/azure/active-directory-b2c/)
- [Custom Policy Samples](https://github.com/azure-ad-b2c/samples)
- [B2C Community](https://github.com/azure-ad-b2c/azureadb2ccommunity.io)
- [Visual Studio Code B2C Extension](https://marketplace.visualstudio.com/items?itemName=AzureADB2CTools.aadb2c)

---

*This guide is part of the Azure B2C IEF Automation Suite. For support and updates, visit our GitHub repository.*