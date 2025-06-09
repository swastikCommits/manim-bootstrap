from manim import *

class CircleToSquare(Scene):
    def construct(self):
        # Create the circle
        circle = Circle(color=BLUE, fill_opacity=0.5)
        circle.set_height(2)  # Make it a reasonable size
        self.play(Create(circle))
        self.wait(1)

        # Create the square
        square = Square(color=RED, fill_opacity=0.5)
        square.set_height(2)  # Make it the same size for a smooth transition

        # Transform the circle into the square
        self.play(Transform(circle, square))
        self.wait(1)

        # Fade out the square
        self.play(FadeOut(square))
        self.wait(0.5)
