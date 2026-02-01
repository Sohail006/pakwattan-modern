# Fix script for AdvancedAttendanceReportsPage.tsx line 674
$filePath = "src\pages\AdvancedAttendanceReportsPage.tsx"

if (Test-Path $filePath) {
    Write-Host "Reading file: $filePath" -ForegroundColor Green
    $content = Get-Content $filePath -Raw
    
    # Create backup
    $backupPath = "$filePath.backup.$(Get-Date -Format 'yyyyMMddHHmmss')"
    Copy-Item $filePath $backupPath
    Write-Host "Backup created: $backupPath" -ForegroundColor Cyan
    
    $modified = $false
    
    # Fix 1: Replace unsafe .toFixed() calls with safe versions
    # Pattern 1: item.property.toFixed(2)
    if ($content -match '(\w+)\.(\w+)\.toFixed\((\d+)\)') {
        Write-Host "Found pattern: property.toFixed()" -ForegroundColor Yellow
        $content = $content -replace '(\w+)\.(\w+)\.toFixed\((\d+)\)', '($1.$2 ?? 0).toFixed($3)'
        $modified = $true
    }
    
    # Pattern 2: ((value / total) * 100).toFixed(2)
    if ($content -match '\(\((\w+)\s*/\s*(\w+)\)\s*\*\s*100\)\.toFixed\((\d+)\)') {
        Write-Host "Found pattern: percentage calculation" -ForegroundColor Yellow
        $content = $content -replace '\(\((\w+)\s*/\s*(\w+)\)\s*\*\s*100\)\.toFixed\((\d+)\)', 
            '((($1 ?? 0) / (($2 ?? 1) || 1)) * 100).toFixed($3)'
        $modified = $true
    }
    
    # Pattern 3: value?.toFixed(2) - already safe but might need fallback
    if ($content -match '(\w+)\?\.toFixed\((\d+)\)') {
        Write-Host "Found pattern: optional chaining" -ForegroundColor Yellow
        $content = $content -replace '(\w+)\?\.toFixed\((\d+)\)', '(($1 ?? 0)).toFixed($2)'
        $modified = $true
    }
    
    # Fix 2: Fix Typography + Chip nesting
    # Find <Typography> followed by <Chip and add component="div"
    if ($content -match '<Typography([^>]*?)>\s*<Chip') {
        Write-Host "Found Typography + Chip nesting issue" -ForegroundColor Yellow
        # Only add component="div" if it doesn't already have a component prop
        $content = $content -replace '(<Typography)((?!component=)[^>]*?)(>\s*<Chip)', '$1$2 component="div"$3'
        $modified = $true
    }
    
    if ($modified) {
        Set-Content -Path $filePath -Value $content -NoNewline
        Write-Host "File fixed successfully!" -ForegroundColor Green
        Write-Host "Please check the file and verify the changes." -ForegroundColor Cyan
    } else {
        Write-Host "No patterns found to fix automatically." -ForegroundColor Yellow
        Write-Host "Please manually check line 674 for .toFixed() calls on potentially undefined values." -ForegroundColor Yellow
    }
} else {
    Write-Host "File not found at: $filePath" -ForegroundColor Red
    Write-Host "Please ensure the file exists or provide the correct path." -ForegroundColor Yellow
}
