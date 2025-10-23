# Google Maps Integration Guide

## 🗺️ Overview

This document explains how to set up and use the Google Maps integration in the Pak Wattan School & College website.

## 🚀 Features Implemented

### ✅ Interactive Map Features
- **Real-time Google Maps**: Interactive map with zoom, pan, and street view
- **Multiple Campus Markers**: Custom markers for all three campuses
- **Info Windows**: Clickable markers with detailed campus information
- **Custom Styling**: Branded markers and map styling
- **Responsive Design**: Mobile-optimized map interface
- **Error Handling**: Graceful fallback when maps fail to load
- **Loading States**: User-friendly loading indicators

### ✅ Campus Information
- **Main Campus (Boys Wing)**: Azam Khan road, beside Mubarak Plaza
- **Primary Section**: Gohar Market, Main Havelian City
- **Girls Campus**: Havelian, Abbottabad

## 🔧 Setup Instructions

### 1. Get Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the **Maps JavaScript API**
4. Create credentials (API Key)
5. Restrict the API key to your domain for security

### 2. Configure Environment Variables

Add your API key to the environment file:

```bash
# .env.local (for development)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_actual_api_key_here

# .env.production (for production)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

### 3. Install Dependencies

The required dependencies are already installed:

```bash
npm install --save-dev @types/google.maps
```

## 📁 File Structure

```
PakWattanModern/
├── components/contact/
│   └── MapSection.tsx          # Main map component
├── types/
│   ├── index.ts                # CampusLocation interface
│   └── google-maps.d.ts        # Google Maps type declarations
├── .env.local                  # Environment variables
└── GOOGLE_MAPS_INTEGRATION.md  # This documentation
```

## 🎯 Component Usage

### MapSection Component

```typescript
import MapSection from '@/components/contact/MapSection'

// In your page component
<MapSection />
```

### Campus Data Structure

```typescript
interface CampusLocation {
  name: string
  address: string
  lat: number
  lng: number
  phone: string
  email: string
}
```

## 🎨 Customization

### Map Styling

The map uses custom styling to match the school's brand:

```typescript
const mapStyles = [
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }]
  }
]
```

### Custom Markers

Each campus has a custom branded marker:

```typescript
const markerIcon = {
  url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg width="40" height="40" viewBox="0 0 40 40">
      <circle cx="20" cy="20" r="18" fill="#24744f" stroke="#fff" stroke-width="2"/>
      <path d="M20 8c-4.4 0-8 3.6-8 8 0 6 8 12 8 12s8-6 8-12c0-4.4-3.6-8-8-8zm0 11c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z" fill="#fff"/>
    </svg>
  `)}`,
  scaledSize: new google.maps.Size(40, 40),
  anchor: new google.maps.Point(20, 40)
}
```

## 🔧 Technical Implementation

### Map Initialization

```typescript
const initializeMap = () => {
  const map = new google.maps.Map(mapRef.current, {
    zoom: 15,
    center: { lat: 34.053221, lng: 73.152673 },
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: mapStyles
  })
}
```

### Marker Creation

```typescript
campuses.forEach((campus) => {
  const marker = new google.maps.Marker({
    position: { lat: campus.lat, lng: campus.lng },
    map: map,
    title: campus.name,
    icon: markerIcon
  })
})
```

### Info Window

```typescript
const infoWindow = new google.maps.InfoWindow({
  content: `
    <div style="padding: 10px; max-width: 250px;">
      <h3>${campus.name}</h3>
      <p>${campus.address}</p>
      <div>
        <a href="tel:${campus.phone}">${campus.phone}</a>
        <a href="mailto:${campus.email}">${campus.email}</a>
      </div>
    </div>
  `
})
```

## 🚨 Error Handling

### API Key Missing
- Shows fallback message with link to Google Maps
- Provides alternative contact methods

### Network Issues
- Displays loading state while map loads
- Graceful fallback to static map link

### Map Loading Failed
- Error state with retry option
- Direct link to Google Maps as backup

## 📱 Mobile Optimization

- **Touch-friendly**: Optimized for mobile interactions
- **Responsive**: Adapts to different screen sizes
- **Fast Loading**: Lazy loading of map resources
- **Accessibility**: Proper ARIA labels and keyboard navigation

## 🔒 Security Considerations

1. **API Key Restrictions**: Restrict API key to your domain
2. **HTTPS Only**: Maps only work over HTTPS in production
3. **Rate Limiting**: Google Maps has usage limits
4. **Environment Variables**: Never commit API keys to version control

## 🚀 Performance Optimization

- **Lazy Loading**: Map loads only when component mounts
- **Async Loading**: Non-blocking script loading
- **Error Boundaries**: Graceful error handling
- **Memory Management**: Proper cleanup of map instances

## 🧪 Testing

### Manual Testing
1. Test with valid API key
2. Test with invalid/missing API key
3. Test on different devices and browsers
4. Test network connectivity issues

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📞 Support

For issues with Google Maps integration:

1. Check API key configuration
2. Verify domain restrictions
3. Check browser console for errors
4. Test with different browsers
5. Verify internet connectivity

## 🔄 Future Enhancements

- [ ] Directions integration
- [ ] Street View integration
- [ ] Multiple map types (satellite, hybrid)
- [ ] Custom map themes
- [ ] Real-time traffic data
- [ ] Campus tour integration

---

**Note**: This integration requires a valid Google Maps API key to function properly. The map will show a fallback message if the API key is missing or invalid.
