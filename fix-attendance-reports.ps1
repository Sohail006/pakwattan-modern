# Script to fix AdvancedAttendanceReportsPage.tsx errors
# This script will find and fix the toFixed error and DOM nesting issue

$filePath = "src\pages\AdvancedAttendanceReportsPage.tsx"

if (Test-Path $filePath) {
    Write-Host "Found file at: $filePath" -ForegroundColor Green
    
    $content = Get-Content $filePath -Raw
    
    # Fix 1: Replace .toFixed() calls that might be on undefined values
    # Pattern: something.toFixed(2) -> (something ?? 0).toFixed(2)
    # This is a common pattern for percentage calculations
    
    # Look for patterns like: value.toFixed or (value).toFixed or ((value / total) * 100).toFixed
    $patterns = @(
        @{
            Pattern = '(\w+)\.toFixed\((\d+)\)'
            Replacement = '($1 ?? 0).toFixed($2)'
            Description = "Simple value.toFixed()"
        },
        @{
            Pattern = '\(\((\w+)\s*/\s*(\w+)\)\s*\*\s*100\)\.toFixed\((\d+)\)'
            Replacement = '((($1 ?? 0) / (($2 ?? 1) || 1)) * 100).toFixed($3)'
            Description = "Percentage calculation"
        },
        @{
            Pattern = '\((\w+)\s*/\s*(\w+)\)\.toFixed\((\d+)\)'
            Replacement = '((($1 ?? 0) / (($2 ?? 1) || 1))).toFixed($3)'
            Description = "Division result"
        }
    )
    
    $modified = $false
    foreach ($pattern in $patterns) {
        if ($content -match $pattern.Pattern) {
            Write-Host "Found pattern: $($pattern.Description)" -ForegroundColor Yellow
            $content = $content -replace $pattern.Pattern, $pattern.Replacement
            $modified = $true
        }
    }
    
    # Fix 2: Fix Typography + Chip nesting issue
    # Change <Typography> to <Typography component="div"> when it contains Chip
    if ($content -match '<Typography[^>]*>\s*<Chip') {
        Write-Host "Found Typography + Chip nesting issue" -ForegroundColor Yellow
        # Replace Typography opening tags that don't have component prop and are followed by Chip
        $content = $content -replace '(<Typography)([^>]*?)(>\s*<Chip)', '$1$2 component="div"$3'
        $modified = $true
    }
    
    if ($modified) {
        # Create backup
        $backupPath = "$filePath.backup"
        Copy-Item $filePath $backupPath
        Write-Host "Created backup: $backupPath" -ForegroundColor Cyan
        
        # Write fixed content
        Set-Content -Path $filePath -Value $content -NoNewline
        Write-Host "Fixed file saved!" -ForegroundColor Green
    } else {
        Write-Host "No patterns found to fix. The file might need manual editing." -ForegroundColor Yellow
        Write-Host "Please check line 674 for .toFixed() calls and ensure values are not undefined." -ForegroundColor Yellow
    }
} else {
    Write-Host "File not found at: $filePath" -ForegroundColor Red
    Write-Host "Please ensure the file exists or provide the correct path." -ForegroundColor Yellow
}
