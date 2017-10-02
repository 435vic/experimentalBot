void setup() {
  size(640, 360);
  for (int i = 0; i < 1000; i++) {
    float size = random(15, 50);
    float minR = random(50, 150);
    float minG = random(50, 150);
    float minB = random(50, 150);
    float r = random(minR, 200);
    float g = random(minG, 200);
    float b = random(minB, 200);
    float x = random(width);
    float y = random(height);
    noStroke();
    fill(r, g, b, 200);
    ellipse(x, y, size, size);
  }
  save("output.jpg");
  exit();
}