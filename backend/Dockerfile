FROM golang:1.22-alpine AS Builder

WORKDIR /app

COPY . .

RUN go build -o phospherus .

FROM alpine:latest

WORKDIR /app

COPY --from=builder /app/. .

EXPOSE 8989

CMD ["./phospherus"]
