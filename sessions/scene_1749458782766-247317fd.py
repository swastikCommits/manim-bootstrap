from manim import *

class GeneratedScene(Scene):
    def construct(self):
        colors = [BLUE, RED, YELLOW, BLUE, GREEN, RED]
        radii = [1.5, 1.5, 1.5, 1.5, 1.5, 1.5]
        centers = [
            [-3.5, 0, 0],
            [-1, 0, 0],
            [1.5, 0, 0],
            [4, 0, 0],
            [6.5, 0, 0],
            [9, 0, 0]
        ]

        circles = []
        for i in range(6):
            circle = Circle(radius=radii[i], color=colors[i], fill_opacity=1)
            circle.move_to(centers[i])
            circles.append(circle)

        g = circles[4].copy().set_color(WHITE)
        g.move_to([6.5 + 0.3, 0.3, 0])
        g.scale(0.95)
        g.set_fill(WHITE)
        g.set_fill(opacity = 1)

        l = circles[1].copy().set_color(WHITE)
        l.move_to([-1 - 0.3, 0.3, 0])
        l.scale(0.95)
        l.set_fill(WHITE)
        l.set_fill(opacity = 1)

        self.play(*[Create(circle) for circle in circles])
        self.play(Create(g))
        self.play(Create(l))
        self.wait(2)