Set-Location D:\docs\portfolio
Start-Process node -ArgumentList @(
  'node_modules\vite\bin\vite.js',
  '--config', 'scripts\vite-patched.config.js',
  '--host', '127.0.0.1'
) -WorkingDirectory 'D:\docs\portfolio' -WindowStyle Hidden
Start-Sleep -Seconds 4
Get-NetTCPConnection -LocalPort 5173 -State Listen -ErrorAction SilentlyContinue |
  Select-Object LocalAddress, LocalPort, State, OwningProcess