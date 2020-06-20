# Third-Party Dependencies

Search and outputs the licenses of all dependencies listed in package.json. 

**Example of use:**

```bash
npx third-party-dependencies -p path-to-package.json
``` 

The resuld is saved in: **output.json**

You can choose a diferente filename passing **-o** (output) parameter.

Above you can see how the output.json looks like:
```json
[
  {
    "package": {
      "name": "chalk",
      "license": "MIT"
    },
    "license": ""
  },
  {
    "package": {
      "name": "commander",
      "license": "MIT"
    },
    "license": "(The MIT License)\n\nCopyright (c) 2011 TJ Holowaychuk <tj@vision-media.ca>\n\nPermission is hereby granted, free of charge, to any person obtaining\na copy of this software and associated documentation files (the\n'Software'), to deal in the Software without restriction, including\nwithout limitation the rights to use, copy, modify, merge, publish,\ndistribute, sublicense, and/or sell copies of the Software, and to\npermit persons to whom the Software is furnished to do so, subject to\nthe following conditions:\n\nThe above copyright notice and this permission notice shall be\nincluded in all copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,\nEXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\nMERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.\nIN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY\nCLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,\nTORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE\nSOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n"
  }
]
```
