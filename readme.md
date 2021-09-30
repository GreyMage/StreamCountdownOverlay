# Install 

Install with `npm i`, this will install dependencies and build the project.

# Use in OBS

- Create a new Browser Source and make sure "Local File" is **unchecked**. 
- Set the Width and Height to your broadcast resolution. 
- In the URL field use the `file:///` protocol to target your file.
    
### Linux:
```
file:///home/whoever/StreamCountdownOverlay/dist/index.html?option=value&anotheroption=anothervalue
```

### Windows:

```
file:///c:/path/to/StreamCountdownOverlay/dist/index.html?option=value&anotheroption=anothervalue
```

### Options:

You can add these options to the end of the `file:///` url like you would parameters on a [normal url](https://en.wikipedia.org/wiki/Query_string). 

- `countdown` : _int_ : This is the total amount of time the countdown will take. Defaults to `5`.
- `offset` : _float_ : This is how early the song will play before 0, for timing. A value of 2.5 will cause the song to start at 2.5 seconds before 0. Defaults to `0`.
- `song` : _string_ : This is the URL of the sound file to play when the timer hits zero (or the offset). This can be a local file. Defaults to nothing.
- `volume` : _float_ : The volume of the song. Range 0-1. Defaults to `0.5`.
- `font` : _string_ : The font to use. Do not use quotes, and only specify one font. Defaults to `sans-serif`. 
- `fontSize` : _string_ : The font size to use for the countdown. This is parsed as a CSS rule. Defaults to `50vh`

### Use Interact

The "Interact" button on OBS allows you to click on the countdown widget itself, which starts and stops the timer if it needs to be reset.

