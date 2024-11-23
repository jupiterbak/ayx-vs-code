# Alteryx Tool Developer Extension

A Visual Studio Code/ Ciursor extension designed to streamline the development process for creating custom tools in Alteryx Designer using Alteryx SDKs.

## Features

This extension provides several features to enhance the development experience when building custom Alteryx Designer tools:

- Workspace-wide tool management
- Custom Tool templates generation
- Custom views for front-end and back-end tool development
- Integrated debugging support for front-end and back-end tool development
- Automatic deployment of tools to Alteryx Designer
- Scaffolding templates for new Alteryx custom tools
- Syntax highlighting for Alteryx-specific files
- IntelliSense support for Alteryx SDK APIs
- Quick snippets for common Alteryx tool patterns

## Installation

1. Open Visual Studio Code
2. Go to the Extensions view (Ctrl+Shift+X or Cmd+Shift+X)
3. Search for "Alteryx Tool Developer"
4. Click Install
5. Reload VS Code when prompted

Alternatively, you can install the extension from the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=your-publisher.alteryx-tool-developer).

## Requirements

- Visual Studio Code 1.x or higher
- Alteryx Designer installed locally
- Node.js and npm (for SDK development)
- Python >= 3.8.5 or >= 3.10 (for SDK development)

## Extension Settings

This extension contributes the following settings:

* `alteryx.sdkPath`: Path to your Alteryx SDK installation
* `alteryx.designerPath`: Path to your Alteryx Designer installation
* `alteryx.autoDeployTools`: Enable/disable automatic deployment of tools to Alteryx Designer

## Known Issues

- Debug configuration may require manual setup in some environments

## Release Notes

### 1.0.0

Initial release of the Alteryx Tool Developer Extension:
- Basic project scaffolding
- SDK integration
- Tool templates

---

## Development

For more information about developing with this extension:

* [Alteryx SDK Documentation](https://help.alteryx.com/current/en/developer-help/platform-sdk.html)
* [Getting Started with Custom Tools](https://help.alteryx.com/current/en/developer-help.html)
* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

**Happy Tool Building!**
