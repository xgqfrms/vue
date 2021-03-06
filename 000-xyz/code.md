 code -h
Visual Studio Code 1.22.2

Usage: code.exe [options] [paths...]

To read output from another program, append '-' (e.g. 'echo Hello World | code -')

Options:
  -d, --diff <file> <file>           Compare two files with each other.
  -a, --add <dir>                    Add folder(s) to the last active window.
  -g, --goto <file:line[:character]> Open a file at the path on the specified
                                     line and character position.
  -n, --new-window                   Force to open a new window.
  -r, --reuse-window                 Force to open a file or folder in the last
                                     active window.
  -w, --wait                         Wait for the files to be closed before
                                     returning.
  --locale <locale>                  The locale to use (e.g. en-US or zh-TW).
  --user-data-dir <dir>              Specifies the directory that user data is
                                     kept in. Can be used to open multiple
                                     distinct instances of Code.
  -v, --version                      Print version.
  -h, --help                         Print usage.

Extensions Management:
  --extensions-dir <dir>
      Set the root path for extensions.
  --list-extensions
      List the installed extensions.
  --show-versions
      Show versions of installed extensions, when using --list-extension.
  --install-extension (<extension-id> | <extension-vsix-path>)
      Installs an extension.
  --uninstall-extension (<extension-id> | <extension-vsix-path>)
      Uninstalls an extension.
  --enable-proposed-api <extension-id>
      Enables proposed api features for an extension.

Troubleshooting:
  --verbose                Print verbose output (implies --wait).
  --log <level>            Log level to use. Default is 'info'. Allowed values
                           are 'critical', 'error', 'warn', 'info', 'debug',
                           'trace', 'off'.
  -s, --status             Print process usage and diagnostics information.
  -p, --performance        Start with the 'Developer: Startup Performance'
                           command enabled.
  --prof-startup           Run CPU profiler during startup
  --disable-extensions     Disable all installed extensions.
  --inspect-extensions     Allow debugging and profiling of extensions. Check
                           the developer tools for the connection uri.
  --inspect-brk-extensions Allow debugging and profiling of extensions with the
                           extension host being paused after start. Check the
                           developer tools for the connection uri.
  --disable-gpu            Disable GPU hardware acceleration.
  --upload-logs            Uploads logs from current session to a secure
                           endpoint.
  --max-memory             Max memory size for a window (in Mbytes).
