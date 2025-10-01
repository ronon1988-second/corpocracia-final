{ pkgs, ... }: {
  channel = "stable-24.05";
  packages = [
    pkgs.python3
  ];
  idx = {
    extensions = [
      "google.gemini-cli-vscode-ide-companion"
    ];
    previews = {
      enable = true;
      previews = {
        web = {
          command = ["python3" "-m" "http.server" "$PORT"];
          manager = "web";
        };
      };
    };
    workspace = {
      onCreate = {
        default.openFiles = [ "index.html" "style.css" "eventos.js" "empresas.js" ];
      };
    };
  };
}
