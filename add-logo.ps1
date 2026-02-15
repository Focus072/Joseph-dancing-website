# Script to add logo image to public folder
Write-Host "=== Logo Image Setup ===" -ForegroundColor Cyan
Write-Host ""

# Check if public folder exists
if (-not (Test-Path "public")) {
    New-Item -ItemType Directory -Path "public" | Out-Null
    Write-Host "Created public folder" -ForegroundColor Green
}

# Prompt for image file path
Write-Host "Please provide the path to your logo image file." -ForegroundColor Yellow
Write-Host "Example: C:\Users\Galal\Pictures\logo.png" -ForegroundColor Gray
Write-Host ""
$imagePath = Read-Host "Enter the full path to your logo image"

# Check if file exists
if (-not (Test-Path $imagePath)) {
    Write-Host "Error: File not found at: $imagePath" -ForegroundColor Red
    Write-Host "Please check the path and try again." -ForegroundColor Yellow
    exit 1
}

# Get file extension
$extension = [System.IO.Path]::GetExtension($imagePath).ToLower()

# Check if it's a supported format
$supportedFormats = @('.png', '.jpg', '.jpeg', '.webp')
if ($extension -notin $supportedFormats) {
    Write-Host "Warning: File format $extension might not be supported." -ForegroundColor Yellow
    Write-Host "Supported formats: PNG, JPG, JPEG, WebP" -ForegroundColor Gray
    $continue = Read-Host "Continue anyway? (y/n)"
    if ($continue -ne 'y') {
        exit 1
    }
}

# Copy to public folder as logo.png (or keep original extension)
$destination = "public\logo$extension"

try {
    Copy-Item -Path $imagePath -Destination $destination -Force
    Write-Host ""
    Write-Host "Success! Logo image copied to: $destination" -ForegroundColor Green
    Write-Host ""
    Write-Host "The logo should now appear on your website." -ForegroundColor Cyan
    Write-Host "If it doesn't show immediately, refresh your browser (Ctrl+Shift+R)" -ForegroundColor Gray
} catch {
    Write-Host "Error copying file: $_" -ForegroundColor Red
    exit 1
}
